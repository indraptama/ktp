import { h, Component } from 'preact';
// import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import KtpStore from '../stores/store';
// import DevTools from 'mobx-react-devtools';
// import Profile from '../routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Header />
					<Home store={KtpStore}/>
			</div>
		);
	}
}
