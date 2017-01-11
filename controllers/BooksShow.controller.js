angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

/********************************************
  remove $http from the controller
  add BookService as a dependency
*******************************************/
BooksShowController.$inject=['$routeParams', '$location', 'BookService'];
function BooksShowController($routeParams,    $location,  BookService) {
  var vm = this;
  var bookId = $routeParams.id;
  // exports
  vm.book = {};  // initially empty, getBook will fill
  vm.getBook = getBook;
  vm.updateBook = updateBook;
  vm.deleteBook = deleteBook;

  // initialization
  getBook(bookId);


  function getBook(id) {
    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.get(id).then()
    **************************************/

    BookService.get(id).then(function (data){
      console.log('here\'s the book data in the controller', data);
      vm.book = data;
    });
  }


  /*****************************************
  *  THIS FUNCTION HAS ALREADY BEEN
  *  REFACTORED TO USE BOOK SERVICE
  *****************************************/
  function updateBook(book) {
    console.log('controller updating book: ', book);
    BookService.update(book).then(function(data){
      console.log('here\'s the book data to update', data);
      vm.book = data;
    });
  }

  function deleteBook(book) {
      console.log('deleting book: ', book);

    BookService.remove(book).then(function (data){
      console.log('here\'s the book data to delete', data);
      vm.book = data;
      $location.path('/');
    })
  }
}
