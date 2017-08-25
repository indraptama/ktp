import { h, Component } from 'preact';
import style from './style';

import TextInput from '../../components/TextInput';
import KtpField from '../../components/KtpField';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state={
      pihak_1:{},
      pihak_2:{},
    }
  }

  handleSaveData(data) {
    const pihak_1 = {...this.state.pihak_1};
    const noUrut = (Object.keys(pihak_1).length - 1) + 1;
    const nik = data.nik;
    pihak_1[`${noUrut}_${data._id}`] = data;
    this.setState({
      pihak_1: pihak_1,
     })
    console.log(this.state.pihak_1);

  }



	render() {
		return (
			<div>
        <KtpField saveData={this.handleSaveData.bind(this)}/>
			</div>
		);
	}
}
