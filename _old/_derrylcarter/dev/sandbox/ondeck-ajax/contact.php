<h1>Get in touch</h1>
		
<div class="content contact">

	<div id="form">
	<form name="contact" action="">
		<ul>
			<li>
			<input 	  id="name" name="name" type="text" placeholder="Name">
			<div class="error name">Please enter a name.</div>
			</li>
			
			<li>
			<input 	  id="email" name="email" type="text" placeholder="Email">
			<div class="error email">Please enter a valid email address.</div>
			</li>
				
			<li>	
			<textarea id="msg" name="msg" rows="4" placeholder="Message"></textarea>
			<div class="error msg">You didn't write anything!</div>
			</li>
		</ul>	
			<a href="#" class="large green super button submit"><span>Send me your message</span></a>
	</form>
	</div>

</div>


<script>

	$(document).ready(function() {

		$("a.button").click(function() {
		
			var name = $("input#name").val();
			var email = $("input#email").val();
			var message = $("textarea#msg").val();
			
			var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
			$.ajax({
			    type: "POST",
			    url: "api_contact.php",
			    data: dataString,
			    success: function() {
			    	$('#form').animate({ opacity: 0 }, 500, function() {
			    		// $('div.contact').animate({ height: '150', marginTop: '+=60' }, 300);
				    	$('#form').html("<div class='success'><h2>Thanks, I'll reply soon!</h2><img src='img/check.png'></div>").animate({opacity:1}, 1000);
			    	});
			    }
			});
			return false;
		
		});
	});

</script>
