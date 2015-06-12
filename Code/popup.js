{	
	$(document).ready(
		function()
		{
			$('#chkEnabled').change(function() { chkEnabled_changed();});
		}
	);
	
  function getEnabledCallback()
  {
        
  }
	
	function setEnabledCallback()
	{
		
	}
	
	function chkEnabled_changed()
	{
		
		if($('#chkEnabled').is(":checked"))
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
		else
		{
	      // Set the enabled flag
			chrome.storage.local.set({'JWTranslate.Enabled': true}, setEnabledCallback);
			
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
}