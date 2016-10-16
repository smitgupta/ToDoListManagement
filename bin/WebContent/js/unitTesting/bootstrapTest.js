(function() {
  var jasmineEnv = jasmine.getEnv();

  /**
   Create the `HTMLReporter`, which Jasmine calls to provide results of each spec and each suite. The Reporter is responsible for presenting results to the user.
   */
  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);

  /**
   Run all of the tests when the page finishes loading
   */
  var currentWindowOnload = window.onload;
  window.onload = function() {
     execJasmine();
  };

  function execJasmine() {
    jasmineEnv.execute();
  }
})();