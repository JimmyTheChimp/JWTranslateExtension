{	
  chrome.storage.local.get('JWTranslate.Enabled', getEnabledCallback);		

	$(document).ready(
		function()
		{
			$('#chkEnabled').change(function() { chkEnabled_changed();});
		}
	);
	
	function chkEnabled_changed()
	{		
		if($('#chkEnabled').is(":checked"))
		{
      enableTranslation();
		}
		else
		{
      disableTranslation();
		}
	}
  
  function getEnabledCallback(items)
  {
    if(items["JWTranslate.Enabled"])
		{
      $('#chkEnabled').prop('checked', true);
			enableTranslation();
		}
    else
    {
      $('#chkEnabled').prop('checked', false);
      disableTranslation();
    } 
  }
	
	function setEnabledCallback()
	{
		
	}
  
  function enableTranslation()
  {
    // Set the enabled flag
		chrome.storage.local.set({'JWTranslate.Enabled': true}, setEnabledCallback);
		
    // Notify the tabs
    chrome.tabs.query({}, 
                      function(results) {
                        for(i = 0; i < results.length; i++)
                        {
                          chrome.tabs.sendMessage(results[i].id, 'JWTranslate.Messages.Enabled');
                        }
                      });
    
    // Change the icon
    chrome.browserAction.setIcon({'path': 'icon.png'});    
  }
  
  function disableTranslation()
  {
    // Set the enabled flag
		chrome.storage.local.set({'JWTranslate.Enabled': false}, setEnabledCallback);
		
    // Notify the tabs
    chrome.tabs.query({}, 
                      function(results) {
                        for(i = 0; i < results.length; i++)
                        {
                          chrome.tabs.sendMessage(results[i].id, 'JWTranslate.Messages.Disabled');
                        }
                      });
    
    // Change the icon
		chrome.browserAction.setIcon({'path': 'grayicon.png'});    
  }
}