import {h} from 'preact';
import style from './style.css';

export default function DropDown(props) {
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



    return(
        <label style={Style.DropDown}>
            <span style={Style.DropDown_title}  ref={(span) => { title = span; }} >{props.title}</span>
            <select style={Style.DropDown_input}
        			type={props.type}
              name={props.name}
              placeholder={props.placeholder}
        			onChange={props.onChange}
        			onFocus={focusHighlight}
        			onBlur={blurHighlight}>
                {
                  (props.dataItems).map(option => {
                    return (
                      <option style="w-100 db" value={option.value}>{option.label}</option>
                    )
                  })
                }

              </select>
            <div style={Style.DropDown_highlight}>
				<span style={Style.DropDown_highlightItem} ref={(span) => { highlight = span; }}/>
			</div>
        </label>
    )
}



function DropDownItem(props) {
  return (
    <option className="w-100 db" value={props.value}>{props.label}</option>
  )
}


const Style = {
  DropDown: {
    display: 'block',
    width: '100%',
  },
  DropDown_title: {
    display: 'block',
    marginBottom: '.25rem',
    textTransform: 'capitalize',
    fontSize: '.65rem',
    color: 'rgba(0, 0, 0, .5)',
    transition: 'all 250ms ease',
  },
  DropDown_input: {
    border: 'none',
    display: 'block',
    fontSize: '16px',
    marginBottom: '.25rem',
    outline: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    appearance: 'none',
    position: 'relative',
    zIndex: '1',
    backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjgzIDE2LjQybDkuMTcgOS4xNyA5LjE3LTkuMTcgMi44MyAyLjgzLTEyIDEyLTEyLTEyeiIvPjxwYXRoIGQ9Ik0wLS43NWg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+PC9zdmc+)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.25rem',
    backgroundPosition: 'right',
  },
  DropDown_highlight: {
    display: 'block',
    backgroundColor: 'pink',
    height: '1px',
    overflow: 'hidden',
  },
  DropDown_highlightItem: {
    display: 'block',
    width: '100%',
    height: '1px',
    backgroundColor: '#673AB7',
    transform: 'translate3d(-100%, 0, 0)',
    transition: 'all 250ms ease',
  }
}
