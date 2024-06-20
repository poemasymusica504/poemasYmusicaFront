import { Button, Card, Col, ConfigProvider, Form, Input, message, Row, Space, theme } from "antd";
import useModeStore from "../../../infrastructure/context/ModeFontStore"
import ModeSelector from "../../Components/ModeSelector";
import LogoClaro from '@assets/LogoClaro.png';
import LogoOscuro from '@assets/LogoOscuro.png';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useUserStore, { IUser } from "../../../infrastructure/context/User";
import { LoginProps, UserRepository } from "../../../infrastructure/repositories/User";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import SingInForm from "../../Components/singIn";


const size = 'large';

const { useToken } = theme;
const LoginView: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useToken();
    const { darkMode } = useModeStore((state) => state);
    const { setUser, resetUser } = useUserStore((state) => state);
    const [ singIn, setSingIn ] = useState(false);
    console.log(singIn)
    
    const repository = new UserRepository();

    useEffect(() => {
        resetUser();
    }, [])

    const { mutate, isPending } = useMutation({
        mutationFn: (data: LoginProps) => repository.Login({ ...data }),
        onSuccess: (resp: { data: IUser; }) => {
            const data = resp.data || {};
            setUser(data)
            navigate('/home/amor')
            void message.success('Login Exitoso')
        },
        onError: (error: AxiosError) => {
            let msg = ''
            if (!error.message) {
                msg = 'network error'
            } else {
                if (error.response?.status === 400) {
                    msg = 'No puede iniciar sesión con las credenciales proporcionadas.';
                } else {
                    msg = "Error al iniciar sesión";
                }
            }
            void message.error(msg)
        }
    })

    const onFinish = (values: LoginProps) => {
        mutate(values);
    }

    const hadleSingIn = () => {
        setSingIn(singIn == true ? false : true)
    }
    
    return (<div style={{ background: darkMode ? token.colorBgBase : token.colorBgTextHover, width: '100%'}}>
            <div style={{ position: 'absolute', right: token.padding, top: token.padding }}><ModeSelector /></div>
            <Row 
                justify={"center"}
                align="middle"
                style={{
                    height: '100vh',
                }}
            >
                <Col xs={24} sm={16} md={12} lg={10} xl={7} style={{ padding: token.padding }}>
                    <Card>
                        <div style={{ width: '100%', textAlign: 'center'}}>
                            <img
                                style={{
                                    width: 250,
                                    paddingBottom: 24,
                                }}
                                src={darkMode ? LogoOscuro : LogoClaro}
                                alt="Logo"
                            />
                        </div>
                        { singIn == false ? 
                            <Form
                                layout="vertical"
                                name="form_login"
                                autoComplete="off"
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Usuario"
                                    name="username"
                                    rules={[{ required: true, message: '¡Por favor ingrese el usuario!'}]}
                                >
                                <Input size={size} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Nombre de Usuario" autoFocus/> 
                                </Form.Item>

                                <Form.Item
                                        label="Contraseña"
                                        name="password"
                                        rules={[{ required: true, message: '¡Por favor ingrese su contraseña!'}]}
                                    >
                                        <Input.Password size={size} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña"/>
                                </Form.Item>
                                
                                <Form.Item style={{ margin: 0}}>
                                    <ConfigProvider>
                                        <Button
                                            disabled={isPending as boolean}
                                            size={size}
                                            type="primary" htmlType="submit" className="login-form-button" block ghost
                                        >
                                            Iniciar sesión
                                        </Button>
                                    </ConfigProvider>
                                </Form.Item>

                            </Form>
                        : 
                            <SingInForm />
                        }
                        <Space size={'middle'} style={{ marginLeft: '15%', marginRight: '20%', marginTop: 10 }}>
                            <Button disabled>
                                Modo Invitado
                            </Button>
                            <Button onClick={hadleSingIn}>
                                { singIn == true ? 'Iniciar Sesión' :  'Crear Cuenta' }
                            </Button>
                        </Space>
                            
                    </Card>
                </Col>
            </Row>
    </div>)
}

export default LoginView;