function UserInterface(client){

    var controlPanel = false;

	$("#closePanel").on("click",function(){
		if(controlPanel){
			$("#shipPanel").animate({
		    	left: "-270px"
  			}, 500)
  			controlPanel = false;
  			$("#closePanel").html(">")
		}else{
			$("#shipPanel").animate({
		    	left: "0px"
  			}, 500)
  			controlPanel = true;
  			$("#closePanel").html("X")
		}
		
	})

	$("#closeStatistic").on("click", function(){
		$("#statisticPanel").css("display", "none")
	})

	$("#showStats").on("click", function(){
		$("#statisticPanel").css("display", "block")
		client.emit("getStats", {})
	})

	client.on("returnStats", function (object) {
		var obj = object.object;

		var table = document.getElementById("statisctiTable");
		table.innerHTML = ""
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.innerHTML = "Gracz: "
		tr.appendChild(th)
		var th = document.createElement("th");
		th.innerHTML = "Wynik: "
		tr.appendChild(th)
		var th = document.createElement("th");
		th.innerHTML = "Data: "
		tr.appendChild(th)
		table.appendChild(tr)


        for(var i = 0; i < obj.length; i++){
        	var tr = document.createElement("tr");
			var th = document.createElement("th");
			th.innerHTML = obj[i].user;
			tr.appendChild(th)
			var th = document.createElement("th");
			th.innerHTML = obj[i].result;
			tr.appendChild(th)
			var th = document.createElement("th");
			th.innerHTML = obj[i].time;
			tr.appendChild(th)
			table.appendChild(tr)
        }
    })

	$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
	  var $this = $(this),
	      label = $this.prev('label');

		  if (e.type === 'keyup') {
				if ($this.val() === '') {
	          label.removeClass('active highlight');
	        } else {
	          label.addClass('active highlight');
	        }
	    } else if (e.type === 'blur') {
	    	if( $this.val() === '' ) {
	    		label.removeClass('active highlight'); 
				} else {
			    label.removeClass('highlight');   
				}   
	    } else if (e.type === 'focus') {
	      
	      if( $this.val() === '' ) {
	    		label.removeClass('highlight'); 
				} 
	      else if( $this.val() !== '' ) {
			    label.addClass('highlight');
				}
	    }

	});

	$('.tab a').on('click', function (e) {
	  
	  e.preventDefault();
	  
	  $(this).parent().addClass('active');
	  $(this).parent().siblings().removeClass('active');
	  
	  target = $(this).attr('href');

	  $('.tab-content > div').not(target).hide();
	  
	  $(target).fadeIn(600);
	  
	});
}