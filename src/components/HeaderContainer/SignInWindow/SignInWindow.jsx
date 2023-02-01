import React, { useEffect, useState } from "react";
import Modal from '../Popup/Modal';
import Registration from './Registration';
import Login from "./Login"; 
import { useTranslation } from "react-i18next";

let SignInWindow = ({ fromLocationData, from, open, onClose }) => {
	const { t } = useTranslation();
	return <Modal open={open} onClose={onClose} 
	tabs={[t('LogIn'), t('Register')]}>
		<Login fromLocationData={fromLocationData} from={from} onClose={onClose} />
		<Registration onClose={onClose} />
	</Modal>;
};

export default SignInWindow;