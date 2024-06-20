import React from 'react';
import { Layout } from 'antd';
import ModulesMenu from '../ModulesMenu';

const { Sider } = Layout;

interface SideBarProps {
	collapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
    return (
        <Sider
			collapsed={collapsed}
			collapsedWidth={80} // 72 90
			className='custom-scrollbar'
			theme='light'
			style={{
				paddingInline: 9, // 16,
				margin: 0,
				overflowY: 'auto',
				minHeight: 'calc(-84px + 100vh)',
				maxHeight: 'calc(-84px + 100vh)',
			}}
		>
            <ModulesMenu />
        </Sider>
    )
}

export default SideBar;