import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";
import ksHelper from '../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

import PhoneForm from './PhoneForm';
import AddressForm from './AddressForm';
import ConfirmForm from './ConfirmForm';

export default class ReceivePhoneTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stepId: 0,
			phone: this.props.phone === "" ? "1" : this.props.phone,
			transferId: "",
			code: this.props.code,
			smsCode: "",
			to: "",
			txId: "",
			progressStep: 0
		};
	}

	onPhoneSuccess(transferId, phone, code) {
		this.setState({
			stepId: 2,
			transferId,
			phone,
			code: code
		});

	}


	onAddressChosen(address) {
		this.setState({
			stepId: 1,
			to: address
		});
	}


	onConfirmSuccess(txId) {
		this.setState({
			stepId: 3,
			txId
		});
	};

	goTo(stepId) {
		this.setState({
			stepId
		});
	};



	_stepComponent() {
		const component = this;
		let stepComponent = null;
		switch (this.state.stepId) {
			case 0:
				stepComponent = (
					<AddressForm onSuccess={(address) => component.onAddressChosen(address)} />
				);
				break;

			case 1:
				stepComponent = (
					<PhoneForm
						onSuccess={(transferId, phone, code) => component.onPhoneSuccess(transferId, phone, code)}
						goBack={() => this.goTo(0)}
						code={this.state.code} phone={this.state.phone} />
				);

				// stepComponent = (
				//     <ConfirmForm onSuccess={(txId) => component.onConfirmSuccess(txId) }
				// phone={this.state.phone} code={this.state.code} transferId={this.state.transferId} to={this.state.to} step={this.state.progressStep}
				//     />
				// );
				break;
			case 2:

				stepComponent = (
					<ConfirmForm onSuccess={(txId) => component.onConfirmSuccess(txId)}
						phone={this.state.phone} code={this.state.code} transferId={this.state.transferId} to={this.state.to} step={this.state.progressStep}
					/>
				);
				break;
			case 3:
				stepComponent = (
					<ConfirmForm onSuccess={(txId) => component.onConfirmSuccess(txId)}
						phone={this.state.phone} code={this.state.code} transferId={this.state.transferId} to={this.state.to} step={this.state.progressStep}
					/>
				);
				break;
			// stepComponent = (
			// 	<div>
			//     Transfer has been succesfully completed!
			//             <div className="crop-text">
			//       Tx Id: {this.state.txId}
			//     </div>
			//     </div>
			// );
			// break;

			default:
				stepComponent = (
					<div>
						Unknown step
		    </div>
				);
		}
		return stepComponent;
	}

	render() {
		console.log("PROXY: ", this.state.code, this.state.phone)
		return (
			<div>
				{(this.state.stepId !== 0) ?
					<div className="m-b">
						<br />
						<label style={{ marginLeft: "-4px" }}>Receiver Address: </label><div className="crop-text">{this.state.to}</div>
					</div> : ""
				}
				{this._stepComponent()}
			</div>
		);
	}
}
