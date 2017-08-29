import {h} from 'preact';

export default function TextInput(props) {
	let title = null;
	let highlight = null;

	function focusHighlight() {
		title.style.color = '#673AB7';
		highlight.style.transform = 'translate3d(0,0,0)';
		highlight.classList.add('isActive');
	}

	function blurHighlight() {
		title.style.color = 'rgba(0,0,0,.5)';
		highlight.style.transform = 'translate3d(-100%,0,0)';
		highlight.classList.remove('isActive');
	}

	function onlyNumeric(event) {
		if(event.keyCode < 48 || event.keyCode > 57) {
		  event.preventDefault();
		}
	}

	function defaultInput(event) {

	}

    return(
        <label style={Style.TextInput}>
            <span style={Style.TextInput_title}  ref={(span) => { title = span; }} >{props.title}</span>
            <input style={Style.TextInput_input}
        			type={props.type}
              name={props.name}
              placeholder={props.placeholder}
              maxlength={props.maxlength}
        			onChange={props.onChange}
        			onFocus={focusHighlight}
        			onBlur={blurHighlight}
        			onKeyPress={props.isNumeric ? onlyNumeric : defaultInput}/>
            <div style={Style.TextInput_highlight}>
				<span style={Style.TextInput_highlightItem} ref={(span) => { highlight = span; }}/>
			</div>
        </label>
    )
}


const Style = {
  TextInput: {
      display: 'block',
      width: '100%',
  },
  TextInput_title: {
      display: 'block',
      marginBottom: '.25rem',
      textTransform: 'capitalize',
      fontSize: '.65rem',
      color: 'rgba(0, 0, 0, .5)',
      transition: 'all 250ms ease',
  },
  TextInput_input: {
      border: 'none',
      display: 'block',
      fontSize: '16px',
      marginBottom: '.25rem',
      outline: 'none',
      width: '100%',
      backgroundColor: 'transparent',
  },
  TextInput_highlight: {
      display: 'block',
      backgroundColor: 'pink',
      height: '1px',
      overflow: 'hidden',
  },
  TextInput_highlightItem: {
      display: 'block',
      width: '100%',
      height: '1px',
      backgroundColor: '#673AB7',
      transform: 'translate3d(-100%,0,0)',
      transition: 'all 250ms ease',
  }
}
