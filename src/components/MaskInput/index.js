import {h} from 'preact';
// import style from './style';
import style from '../TextInput/style';
import MaskedInput from 'react-maskedinput';

export default function MaskInput(props) {
	let title = null;
	let highlight = null;

	function focusHighlight() {
		title.style.color = '#673AB7';
		highlight.style.transform = 'translate3d(0,0,0)';
		highlight.classList.add('isActive');
	}

	function blurHighlight() {
		title.style.color = 'inherit';
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
            <MaskedInput className={style.TextInput_input}
              placeholderChar=" "
              mask={props.mask}
        			type={props.type} name={props.name}
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
