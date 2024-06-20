import { Spin } from 'antd';

/**
* Props for the LoadingComponent component.
*/
interface LoadingComponentProps {
	/** Text displayed next to the spinner. */
	label?: string
	/** Determines if the component occupies 100% of the height of its container. */
	fullHeight?: boolean
}

/**
* Loading component that displays a spinner while waiting for content to load.
* You can display custom text and take up the full height of your container if needed.
* @example
* <LoadingComponent />
* <LoadingComponent label="Cargando datos..." fullHeight />
* @returns {JSX.Element} Loading component with spinner and optional text.
*/
const LoadingComponent = ({ label, fullHeight = false }: LoadingComponentProps): JSX.Element => {
	return (
		<div style={{
			display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
			height: fullHeight ? '100vh' : '100%', gap: 24,
		}}>
			{/* <Spin tip={label || "Cargando..."} size="large" /> */}
			<Spin size="large"/>
			<span>{label}</span>
		</div>
	);
};

export default LoadingComponent;