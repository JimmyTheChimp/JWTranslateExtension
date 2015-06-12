{
  // Initial setup  
  chrome.runtime.onMessage.addListener(messageCallback);
	chrome.storage.local.get('JWTranslate.Enabled', getEnabledCallback);		
	
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
	function docMouseUp()
	{
		var selectedText;

		selectedText = document.getSelection().toString();
		
		if(selectedText.length > 0)
		{
			console.log(selectedText);
		}
	}
}