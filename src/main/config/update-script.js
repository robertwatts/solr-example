/*
  This is a basic skeleton JavaScript update processor.

  In order for this to be executed, it must be properly wired into solrconfig.xml; by default it is commented out in
  the example solrconfig.xml and must be uncommented to be enabled.

  See http://wiki.apache.org/solr/ScriptUpdateProcessor for more details.
*/

function processAdd(cmd) {

  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  
  trademarkField = doc.getField('trademark');

  var analyzer = req.getCore().getLatestSchema().getFieldTypeByName('text_trademark').getAnalyzer();
  doc.setField('trademark_tokens', 
    getAnalyzerResult(analyzer, null, trademarkField.getFirstValue()));  
  
}

function getAnalyzerResult(analyzer, fieldName, fieldValue) {
  var result =[];
  var token_stream = analyzer.tokenStream(fieldName, new java.io.StringReader(fieldValue));
  var term_att = token_stream.getAttribute(
    Packages.org.apache.lucene.analysis.tokenattributes.CharTermAttribute);

  token_stream.reset();
  while (token_stream.incrementToken()) {
    result.push(term_att.toString());
  }
  token_stream.end();
  token_stream.close();

  return result;

}

function processDelete(cmd) {
  // no-op
}

function processMergeIndexes(cmd) {
  // no-op
}

function processCommit(cmd) {
  // no-op
}

function processRollback(cmd) {
  // no-op
}

function finish() {
  // no-op
}
