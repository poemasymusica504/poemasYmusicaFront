import { LockOutlined, MailOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message, Space } from "antd"
import { UsuarioProps } from "../../domain/Usuario";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UsuarioRepository } from "../../infrastructure/repositories/Usuario";
import useUserStore, { IUser } from "../../infrastructure/context/User";
import { useNavigate } from "react-router-dom";


const SingInForm: React.FC =  () => {

    const { setUser } = useUserStore((state) => state);

    const size = 'large';

    const navigate = useNavigate();

    const usuarioRepository = new UsuarioRepository();
    
    const { mutate, isPending} = useMutation({
        mutationFn: (data: UsuarioProps) => usuarioRepository.singIn({ ...data }),
        onSuccess: (resp: { data: IUser; }) => {
            const data = resp.data || {};
            void message.success('Usuario creado exitosamente')
            setUser(data)
            navigate('/home/amor/')
            void message.success('Login Existoso')
            
        },
        onError: (error: AxiosError) => {
            let msg = ''
            if (!error.message) {
                msg = 'network error'
            } else {
                if (error.response?.status === 500) {
                    msg = 'Error al crear el usuario';
                }
            }
            void message.error(msg)
        }
    })

    const onSingIn = (values: UsuarioProps) => {
        console.log(values)
        mutate(values)
    }

    return (    
        <Form
            layout="vertical"
            name="form_singIn"
            autoComplete="off"
            initialValues={{
                nombres: '',
                apellidos: '',
                email: '',
                username: '',
                password: '',
                confirm_password: '',
            }}
            onFinish={onSingIn}
        >   
            <Space>
                <Form.Item
                    label='Nombres'
                    name='first_name'
                    style={{ marginBottom: 5}}
                    rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
                >
                    <Input size={size} prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="Nombres" />
                </Form.Item>

                <Form.Item
                    label='Apellidos'
                    name='last_name'
                    style={{ marginBottom: 5}}
                    rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
                >
                    <Input size={size} prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="Apellidos" />
                </Form.Item>
            </Space>

            <Form.Item
                label='Email'
                name='email'
                style={{ marginBottom: 5}}
                rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
            >
                <Input size={size} prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                label='Usuario'
                name='username'
                style={{ marginBottom: 5}}
                rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
            >
                <Input size={size} prefix={<UserAddOutlined className="site-form-item-icon" />} type="text" placeholder="Username" />
            </Form.Item>

            <Space>
                <Form.Item
                    label='Contraseña'
                    name='password'
                    style={{ marginBottom: 5}}
                    rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
                >
                    <Input.Password size={size} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
                </Form.Item>

                <Form.Item
                    label='Confirmar Contraseña'
                    name='confirm_password'
                    style={{ marginBottom: 5}}
                    rules={[ { required: true, message:'¡Por favor ingrese este campo!' } ]}
                >
                    <Input.Password size={size} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirmar Contraseña" />
                </Form.Item>
            </Space>

            <Form.Item style={{ margin: 0}}>
                <ConfigProvider>
                    <Button
                        disabled={isPending as boolean}
                        size={size}
                        type="primary" htmlType="submit" className="login-form-button" block ghost
                    >
                        Crear Cuenta
                    </Button>
                </ConfigProvider>
            </Form.Item>
        </Form>
    )
}

export default SingInForm;