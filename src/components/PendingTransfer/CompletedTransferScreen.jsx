import React from 'react';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';


const CompletedTransferScreen = ({ phone, secretCode, amount}) => {
    const shareLink = `${ETH2PHONE_HOST}/receive?code=${secretCode}&phone=${phone}`;
    return (
	<div>
	  <div style={{ fontSize: 18, marginBottom: 17 }}>
	    <div style={{display: 'inline-block', marginRight: 5}}>You have successfully sent</div>
	    <div style={{display: 'inline-block', color: '#2bc64f'}}>{amount} ETH</div>
	    <div style={{marginTop: 5}}>to {phone}</div>
	  </div>
	  <div style={{ fontSize: 12, marginBottom: 18 }}>Share this link with recipient by copying to clipboard</div>
	  <div style={{width: 258, height: 44, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3}}>
	    { shareLink }
	  </div>
	  <div style={{marginTop: 28}}>
	    <ButtonPrimary buttonColor='#0099ff' handleClick={() => {
		  // copy share link to clipboard
		  copy(shareLink);
		  alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
	      }}>
	      Share link
	    </ButtonPrimary>
	  </div>
	</div>
    );
}


export default CompletedTransferScreen;
