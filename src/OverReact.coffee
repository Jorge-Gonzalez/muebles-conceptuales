class OverReact
  constructor: (id, @class, @target) ->

    @reactors = new Array()
    @element = document.getElementById(id)
    @toChange = if @target? then document.getElementById(@target) else @element
       
  handleClick: (ev) => 
    @element.parentElement.click()

  toggle: (ev) =>
    @toChange.classList.toggle(@class)
    
  add: (overReact) ->
    overReact.element.addEventListener('mouseover', @toggle, false)
    overReact.element.addEventListener('mouseout', @toggle, false)
    @reactors.push(overReact)

