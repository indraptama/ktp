import {h} from 'preact';
import style from './style';

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
        <label className={style.DropDown}>
            <span className={style.DropDown_title}  ref={(span) => { title = span; }} >{props.title}</span>
            <select className={style.DropDown_input}
        			type={props.type}
              name={props.name}
              placeholder={props.placeholder}
        			onChange={props.onChange}
        			onFocus={focusHighlight}
        			onBlur={blurHighlight}>
                {
                  (props.dataItems).map(option => {
                    return (
                      <option className="w-100 db" value={option.value}>{option.label}</option>
                    )
                  })
                }

              </select>
            <div className={style.DropDown_highlight}>
				<span className={style.DropDown_highlightItem} ref={(span) => { highlight = span; }}/>
			</div>
        </label>
    )
}



function DropDownItem(props) {
  return (
    <option className="w-100 db" value={props.value}>{props.label}</option>
  )
}
