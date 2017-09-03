import {h} from 'preact';
import style from './style';

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
        <label className={style.TextInput}>
            <span className={style.TextInput_title}  ref={(span) => { title = span; }} >{props.title}</span>
            <input className={style.TextInput_input}
        			type={props.type}
              name={props.name}
              value={props.Value}
              defaultValue={props.defValue}
              placeholder={props.placeholder}
              maxlength={props.maxlength}
        			onChange={props.onChange}
        			onFocus={focusHighlight}
        			onBlur={blurHighlight}
        			onKeyPress={props.isNumeric ? onlyNumeric : defaultInput}/>
            <div className={style.TextInput_highlight}>
				<span className={style.TextInput_highlightItem} ref={(span) => { highlight = span; }}/>
			</div>
        </label>
    )
}
