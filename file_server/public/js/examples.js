;(function () {
  const $ = window.jQuery
  const EXAMPLES = window.CHESSBOARD_EXAMPLES
  const prettyPrint = window.prettyPrint

  function htmlEscape (str) {
    return (str + '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
  }

  function highlightGroupHeader (groupIdx) {
    $('#examplesNav h4').removeClass('active')
    $('#groupHeader-' + groupIdx).addClass('active')
  }

  function highlightExampleLink (exampleId) {
    $('#examplesNav li').removeClass('active')
    $('#exampleLink-' + exampleId).addClass('active')
  }

  function buildExampleBodyHTML (example, id) {
    let CSS = '', html = '<div class="container-4e1ee">'
    if (example.css) {
      CSS = '<h4>CSS</h4>' + '<pre class="prettyprint">' + htmlEscape(example.css) + '</pre>'
      html += '<style type="text/css">' + example.css + '</style>'
    }
    html += example.html + '</div>'
    return '<h2 class="hover-linkable">' +
      '<a class="hover-link" href="#' + id + '"></a>' + htmlEscape(example.name) + '</h2>' +
      '<p>' + example.description + '</p>' +
      html +
      CSS +
      '<h4>HTML</h4>' +
      '<pre class="prettyprint">' + htmlEscape(example.html) + '</pre>' +
      '<h4>JavaScript</h4>' +
      '<pre class="prettyprint">' + htmlEscape(example.jsStr) + '</pre>' +
      '<p><a class="small-link-335ea" href="examples/' + id + '.html" target="_blank">View this example in new window.</a></p>'
  }

  function showExample (exampleId) {
    const groupIdx = $('#exampleLink-' + exampleId).parent('ul').attr('id').replace('groupContainer-', '')

    $('#groupContainer-' + groupIdx).css('display', '')
    highlightGroupHeader(groupIdx)
    highlightExampleLink(exampleId)

    $('#exampleBodyContainer').html(buildExampleBodyHTML(EXAMPLES[exampleId], exampleId))
    EXAMPLES[exampleId].jsFn()

    prettyPrint()
  }

  function clickExampleNavLink () {
    const exampleId = $(this).attr('id').replace('exampleLink-', '')
    if (!EXAMPLES.hasOwnProperty(exampleId)) return

    window.location.hash = exampleId
    loadExampleFromHash()
  }

  function loadExampleFromHash () {
    let exampleId = parseInt(window.location.hash.replace('#', ''), 10)
    if (!EXAMPLES.hasOwnProperty(exampleId)) {
      exampleId = 1000
      window.location.hash = exampleId
    }
    showExample(exampleId)
  }

  function clickGroupHeader () {
    const groupIdx = $(this).attr('id').replace('groupHeader-', '')
    const $examplesList = $('#groupContainer-' + groupIdx)
    if ($examplesList.css('display') === 'none') {
      $examplesList.slideDown('fast')
    } else {
      $examplesList.slideUp('fast')
    }
  }

  function init () {
    const $examplesNav = $('#examplesNav')
    $examplesNav.on('click', 'li', clickExampleNavLink)
    $examplesNav.on('click', 'h4', clickGroupHeader)
    loadExampleFromHash()
  }

  $(document).ready(init)
})()
