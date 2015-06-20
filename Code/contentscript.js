{
  // Initial setup  
  chrome.runtime.onMessage.addListener(messageCallback);
	chrome.storage.local.get('JWTranslate.Enabled', getEnabledCallback);		
  
  //TODO: Remove before posting
  var API_KEY = 'DONT WANT TO POST THIS PUBLICLY';
  var GOOGLE_TRANSLATE_URL = 'http://translate.google.com';
  var GOOGLE_TRANSLATE_API_URL = 'https://www.googleapis.com/language/translate/v2';
  var globalTargetLang = 'en';
  var sourceLang = null;
	
  // Handles messages sent to contentscript from the runtime
	function messageCallback(message, sender, sendResponse)
	{
				switch(message)
				{
					case 'JWTranslate.Messages.Enabled':
            $(document).mouseup(docMouseUp);
						break;
					case 'JWTranslate.Messages.Disabled':
            $(document).off("mouseup");
            break;
          default:
            break;
				}
	}
	
  // Handles callback from getting JWTranslate.Enabled value
	function getEnabledCallback(items)
	{
		if(items["JWTranslate.Enabled"])
		{
			$(document).mouseup(docMouseUp);
		}
	}
	
  // Mouseup handler
	function docMouseUp(event)
	{
		var selectedText;
    var anchorNode;
    var popupX;
    var popupY;

		selectedText = document.getSelection().toString();  

    popupX = event.pageX;
    popupY = event.pageY - 50;
 
		if(selectedText.length > 0)
		{          
			translateText(selectedText, popupX, popupY);
    }
	}
  
  // Translate the text
  function translateText(text, popupX, popupY)
  {
    var requestData;
    
    requestData = {
                    key: API_KEY,
                    target: globalTargetLang,
                    q: text
                  };

    if(sourceLang)
    {
      requestData.source = sourceLang;      
    }
    
    $.getJSON(GOOGLE_TRANSLATE_API_URL,
             requestData,
             function(data, status, jqXHR)
             {              
               var popupContents;
               var translationData;
               var translatedText;
               var sourceLang;
               var targetLang;
               
               if(status = 'success')
               {
                 translationData = data.data.translations[0];
                 
                 translatedText = translationData.translatedText;
                 sourceLang = translationData.detectedSourceLanguage;
                 targetLang = globalTargetLang;
               }
               else
               {
                 translatedText = 'Error occurred.';                 
                 sourceLang = 'N/A';
                 targetLang = 'N/A';
               }
    
               popupContents = '<div id="JWTranslatePopup"\
                                      style="position: absolute;\
                                             left: ' + popupX + 'px;\
                                             top:' + popupY + 'px;\
                                             background-color:#fff;\
                                             border: 2px solid #333;\
                                             padding: 3px;\
                                             z-index: 1000"\
                                             >';
               popupContents += '<div>' + translatedText + '</div>';
               popupContents += 'Translated by <a href="' + GOOGLE_TRANSLATE_URL + '">Google translate<a>'
               popupContents += '</div>';
               
               
               $('body').append(popupContents);
               
               setTimeout(function(){
                            $('#JWTranslatePopup').remove();
                          }, 1500);
             });
    
    
  }
}