

suite('<x-template>', function() {

  test('stamps', function() {
    var template = document.querySelector('#bound');
    var row = template.stamp({text: 'ohai'});
    assert.equal(row.root.textContent.trim(), 'ohai');
  });

});

