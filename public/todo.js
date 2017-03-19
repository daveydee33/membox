// JavaScript watch and code 'ToDo' -- v4: objects and booleans.  objects expanded

var todoList = {
    todos: [],

    // This is being replaced by view.displayTodos to display in HTML instead of console.
    /*
    displayTodos: function() {
        console.log("My Todos count: ", this.todos.length);
        if (this.todos.length === 0){
            console.log("My Todos list is empty.");
        } else {
            //console.log("My Todos: ", this.todos);  // can I use a + here instead of , ?.  does comma add a space?
            for (var i = 0; i < this.todos.length; i++) {
                var status = undefined;
                if (this.todos[i].completed === true){
                    status = 'x';
                } else {
                    status = ' ';
                }
                console.log("Todo #" + i + " (" + status + ") " + this.todos[i].todoText);
            }
        }
    },
    */

    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false,
        });
        view.displayTodos();
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },

    changeTodo: function(position, todoText) {
        //this.todos[position] = todo;    // v3. 
        this.todos[position].todoText = todoText;
        view.displayTodos();
    },

    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed
        // isn't this the same???  why did he write it in 2 lines, more complicated, if I could write it in one?  https://watchandcode.com/courses/60264/lectures/946811
        //this.todos[position].completed = !this.todos[position].completed;
        view.displayTodos();
    },

    // if at least 1 is not complete, set that and anything else to complete.
    // if all are complete already, set them all to not-complete
    // if all are not-complete, set them to complete
    toggleAll: function() {

        // my version - worked fine.
        /*
        var numCompleted = 0;
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === false) {
                numCompleted++;
                this.toggleCompleted(i);
                console.log(i + " was not completed.  setting to complete");
            }
        }
        if (numCompleted === 0){
            console.log("all were completed, setting all to not-completed");
            for (var i = 0; i < this.todos.length; i++) {
                this.toggleCompleted(i);
            }
        }
        view.displayTodos();
        */

        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Version 11 - "Destroy all for loops".  Using forEach instead.  # callback functions / higher order functions

        // Get number of completed todos.
        // for (var i = 0; i < totalTodos; i++) {
        //     if (this.todos[i].completed === true) {
        //         completedTodos++;
        //     }
        // }
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        // Case 1: If everything's true, make everything false.
        if (completedTodos === totalTodos) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            });
        // Case 2: Otherwise, make everything true.
        } else {
            this.todos.forEach(function(todo) {
                todo.completed = true;
            });
        }
        
        view.displayTodos();
    }
};


// create handlers object with the methods that the page buttons can call.
// this is an alternative way that will replace the 'addEventListener' way of 
// adding functions to HTML button by page element IDs (getElementById).
// This case has less code, more connected, and easier to read in HTML
// that the buttons will do something when clicked, rather than the code being
// somewhere else that get's added on with JavaScript.
// Other times the 'addEventListener' is bettwer if we're doing more than just
// adding a click method.
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    addTodoTextInput.focus();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);  // note: valueAsNumber
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  deleteTodo: function(position) {
    //var deleteTodoPosition = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(position);
    //deleteTodoPosition.value = '';
  },
  toggleCompleted: function() {
    var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
  }
};

var view = {
  displayTodos: function() {
    var ulNode = document.querySelector('ul');
    ulNode.innerHTML = ''; // clear the list first.
    
    for (var i = 0; i < todoList.todos.length; i++){
      var liNode = document.createElement('li');
      var todo = todoList.todos[i];
      if (todoList.todos[i].completed === true) {
        liNode.textContent = i + ": (x) " + todo.todoText;
      } else {
        liNode.textContent = i + ": ( ) " + todo.todoText;
      }
      // this worked too...
      /* 
      var textNode = document.createTextNode(i + ": " + todoList.todos[i].todoText);
      liNode.appendChild(textNode);
      */
      liNode.id = i;  // give an id like this.  <li id="0">first todo item</li>
      liNode.appendChild(this.createDeleteButton());  // ? view.createDeleteButton() ?
      ulNode.appendChild(liNode);      
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setupEventListeners: function() {
    var todosUl = document.getElementById('todosUl');
    todosUl.addEventListener("click", function(event) {
        //console.log(event); // debugging
        var elementClicked = event.target;
        if (elementClicked.className === 'deleteButton') {
            var id = elementClicked.parentNode.id;
            console.log(id); //debugging
            handlers.deleteTodo(parseInt(id));;  // passing the button's parent (list item) id as an integer (instead of string).
        }
    });
  }
};

view.setupEventListeners();