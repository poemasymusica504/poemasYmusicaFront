import { Button, Drawer } from "antd";
import useModeStore from "../../../infrastructure/context/ModeFontStore";
import { CloseOutlined } from "@ant-design/icons";

import LogoClaro from '@assets/LogoClaro.png';
import LogoOscuro from '@assets/LogoOscuro.png';
import ModulesMenu from "../ModulesMenu";

interface NavBarProps {
	collapsed: boolean;
	setCollapsed: (params: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ collapsed, setCollapsed }) => {
    const { darkMode } = useModeStore((state) => state);

    return (
        <Drawer
            styles={{
                body: { padding: 0 },
            }}
            placement="left"
            onClose={() => setCollapsed(true)}
            open={!collapsed}
            size="default"
            closable={false}
        >
            <div style={{
                position: 'sticky', top: 0, zIndex: 1, right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 16,
                paddingBottom: 16,
            }}>
                <Button
                    size="small"
                    type="text"
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => setCollapsed(true)}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                />

                <img
                    style={{ width: '200px', height: 'auto' }}
                    src={ darkMode ? LogoOscuro : LogoClaro }
                    alt="Logo"
                />
            </div>

            <ModulesMenu />

        </Drawer>
    )
}

export default NavBar;