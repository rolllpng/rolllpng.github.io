function runCode() {
    const htmlInput = document.getElementById('html-input').value;
    const resultFrame = document.getElementById('result-frame');
    const iframeDocument = resultFrame.contentDocument || resultFrame.contentWindow.document;
    
    iframeDocument.open();
    iframeDocument.write(htmlInput);
    iframeDocument.close();
}
