
class OverReact
	constructor: (id, @class, @target) ->

		@reactors = new Array()
		@element = document.getElementById(id)
		if @element.type == 'image/svg+xml'
			@element.addEventListener('load', @svgLoaded, false)
		else
			@toChange = if @target? then document.getElementById(@target) else @element
	 		
	handleClick: (ev) => 
		@element.parentElement.click()

	svgLoaded: (ev) =>
		@toChange = ev.target.contentDocument.getElementById(@target)
		ev.target.contentDocument.addEventListener('click', @handleClick, false)
		true

	toggle: (ev) =>
		@toChange.classList.toggle(@class)
		
	add: (overReact) ->
		overReact.element.addEventListener('mouseover', @toggle, false)
		overReact.element.addEventListener('mouseout', @toggle, false)
		@reactors.push(overReact)

init = ->

	main_message = new OverReact('main_box', 'hover')
	main_arrow = new OverReact('main_arrow', 'hover', 'main-arrow')
	main_message.add(main_arrow)
	main_arrow.add(main_message)

	#about_message = new OverReact('about_box', 'hover')
	#about_arrow = new OverReact('about_arrow', 'hover', 'about-arrow')
	#about_message.add(about_arrow)
	#about_arrow.add(about_message)

	box = document.getElementById('box')

onload = init()

sesionT = new Date()

$(document).ready(->

	$('.box_skitter_large').skitter({
		theme: 'square',
		numbers_align: 'center',
		progressbar: false, 
		dots: true, 
		preview: true,
		auto_play: false,
		enable_navigation_keys: true,
		autoplay: 5
	})

	swip = null
	currSwipebox = null

	mySwiper = $('.swiper-container').swiper({
		slidesPerView: 'auto',
		speed : 1000,
		freeMode : true,
		freeModeFluid : true,
		grabCursor: true,
		preventLinks: true,
		onTouchMove: (swp) ->
			# Adds a class to the current slide anchor to prevent click behavior when dragging
			currSwipebox.addClass('noclick')
	})

	$('#swipe-right').on('mouseover', (e)->
		mySwiper.swipeNext()
		swip = window.setInterval( mySwiper.swipeNext, 1000 )
	)
	$('#swipe-right').on('mouseout', (e)->
		window.clearInterval( swip )
	)
	$('#swipe-left').on('mouseover', (e)->
		mySwiper.swipePrev()
		swip = window.setInterval( mySwiper.swipePrev, 1000 )
	)
	$('#swipe-left').on('mouseout', (e)->
		window.clearInterval( swip )
	)
	$(".swipebox").swipebox()

	$(".swipebox").on('mousedown', (e)->
		# Captures the current slide anchor before dragging
		currSwipebox = $(this)
	)
	# ScrollD
	$("[id*='Btn']").stop(true).on('click', (e) ->
		e.preventDefault()
		$(this).scrolld()
	)
	$("#contactForm").validate()
	#callback handler for form submit
	$("#contactForm").submit (e) ->
		this['sesion'].value = new Date() - sesionT 
		postData = $(this).serializeArray()
		formURL = $(this).attr("action")
		$.ajax
		    url: formURL
		    type: "POST"
		    data: postData
		    success: (data, textStatus, jqXHR) ->
				console.log data
				# MOSTRAR AVISO MENSAGE ENVIADO
				#data: return data from server
			error: (jqXHR, textStatus, errorThrown) ->
				console.log errorThrown 
				#if fails
		e.preventDefault() #STOP default action

	$("#expoBody").css('overflow', 'hidden')
	$("#expoBody").perfectScrollbar({
		suppressScrollX: true
	})
	$("#content").css('overflow', 'hidden')
	$("#content").perfectScrollbar({
		suppressScrollX: true
	})
)

window.showItemsPopup = (id) ->
	$('#Disponibles').bPopup(
		{
			#modalClose: false,
			opacity: 0.8,
			positionStyle: 'fixed',
			contentContainer:'#content',
			transition: 'slideIn',
			transitionClose: 'slideBack',
			scrollBar: false,
			onClose: ->
				$("#content " + id).removeClass('marked')
		},
		->
			$("#content").scrollTop($("#content " + id).position().top)
			$("#content").perfectScrollbar('update')
			$("#content " + id).addClass('marked')
	)
