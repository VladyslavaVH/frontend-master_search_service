import React, { useEffect } from "react";
import Modal from '../Popup/Modal';
import Registration from './Registration';
import Login from "./Login/Login";

let SignInWindow = ({ fromLocationData, from, open, onClose }) => {

	return <Modal open={open} onClose={onClose} 
	tabs={['LogIn', 'Register']}>
		<Login fromLocationData={fromLocationData} from={from} onClose={onClose} />
		<Registration onClose={onClose} />
	</Modal>;
};

export default SignInWindow;