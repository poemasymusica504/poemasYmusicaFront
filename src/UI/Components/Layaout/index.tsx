import { Button, ConfigProvider, Layout, theme } from "antd"
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useModeStore from "../../../infrastructure/context/ModeFontStore";
import LogoClaro from '@assets/LogoClaro.png'
import LogoOsucuro from '@assets/LogoOscuro.png'
import ModeSelector from "../ModeSelector";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";

const { Header } = Layout

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { darkMode } = useModeStore((state) => state)
    const matchMedia = '(min-width: 768px)';
    const [isMobile, setIsMobile] = useState(!window.matchMedia(matchMedia).matches);
    const { token: { colorBgContainer } } = theme.useToken();

    useEffect(() => {
		window.matchMedia(matchMedia).addEventListener('change', e => setIsMobile(!e.matches));
	}, []);

    return (
        <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#fa1f03'
            }
        }}
        >
            <Layout 
                style={{
                    backgroundColor: 'transparent',
                    overflow: 'hidden'
                }}
            >
                {isMobile && <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />}

                <Header 
                    style={{
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingInline: 16,
                        backgroundColor: colorBgContainer,
                        overflow: 'hidden',
                        height: 83,
                    }}
                >   
                    <div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
					}}>
                        <div style={{ display: 'flex' }} >
                        <Button
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    marginRight: 16,
                                    width: 48,
                                    alignSelf: 'center'
                                }}
                            >
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </Button> 
                            {!isMobile && (
                                <img 
                                    style={{ width: 'auto', height: '63px' }}
                                    src={darkMode 
                                        ? LogoOsucuro
                                        : LogoClaro
                                    }
                                    alt="Logo"
                                />
                            )}
                        </div>

                       <ModeSelector /> 
                    </div>
                </Header>

                <Layout hasSider
                    style={{
                        backgroundColor: 'transparent',
                        overflow: 'hidden'
                    }}
                >
                    {!isMobile && <SideBar {...{ collapsed }} />}

                    <Layout
                        style={{
                            position: 'relative',
                            marginRight: !isMobile ? 16 : 0,
                            padding: 16,
                            paddingBottom: 0,
                            paddingRight: 8,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            backgroundColor: 'rgb(238, 242, 246)',
                            minHeight: 'calc(-84px + 100vh)',
                            maxHeight: 'calc(-84px + 100vh)',
                            overflow: 'hidden',
                            background: darkMode ? '#000000' : 'rgb(238, 242, 246)',
                        }}
					>
                        <div className='custom-scrollbar'>
                            <div className="scroll-content" style={{ paddingBottom: 16 }}>
                                <Outlet />
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default App;