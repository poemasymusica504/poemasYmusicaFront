import { Button, Card, Form, Input, notification, Spin } from "antd"
import { poemaDTO } from "../../../infrastructure/repositories/poemas"
import TextArea from "antd/es/input/TextArea"
import { UseMutationResult } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

interface PoemaFormProps {
    values?: poemaDTO,
    isLoading?: boolean,
    tipo: string,
    mutation: UseMutationResult<poemaDTO, Error, poemaDTO, unknown> | null
}

const PoemaForm: React.FC<PoemaFormProps> = ({ values, tipo, isLoading, mutation}) => {

    const navigate = useNavigate()

    const params = useParams();
    const [form] = Form.useForm();
    const [cargar, setCargar] = useState(false);

    useEffect(()=>{
        if(values?.id) {
            setCargar(true);
        } if (params?.accion == 'crear') {
            setCargar(true);
        }
    }, [values, params])

    const onFinishForm = (formValues: poemaDTO) => {
        const dataForm = {
            ...formValues,
            id: values?.id ?? undefined,
        }
       
        if (values?.id) {
            mutation?.mutate(dataForm,
                {
                    onSuccess: () => {
                        notification.success({ message:'Poema editado correctamente' });
                        navigate(`/home/${tipo}/${values.id}/`)
                    },
                    onError:()=>{
                        notification.error({ message:'Error al editar el poema' });
                    }
                }
            )
        } else {
            mutation?.mutate(dataForm,
                {
                    onSuccess: () => {
                        notification.success({ message:'Poema creado correctamente' });
                        navigate(`/home/${tipo}/`)
                    },
                    onError:()=>{
                        notification.error({ message:'Error al crear el poema' });
                    }
                }
            )

        }
    }
    
    return (
        <>  
            {cargar && 
                <Spin spinning={mutation?.isPending ?? isLoading}>
                    <Form
                        form={form}
                        name="formPoema"
                        layout="vertical"
                        onFinish={onFinishForm}
                        autoComplete="off"
                        initialValues={{
                            ...values,
                            'tipo':values?.tipo ?? tipo,
                        }}
                        size="large"
                    >
                        <Card
                        >
                            <Form.Item
                                name='titulo'
                                label='Titulo'
                                rules={[{ required: true, message:'Por favor ingresar este campo.' }]}
                            >
                                <Input type='text' placeholder="Titulo" />
                            </Form.Item>
                            <Form.Item
                                name='escritor'
                                label='Escritor'
                                rules={[{ required: true, message:'Por favor ingresar este campo.' }]}
                            >
                                <Input type='text' placeholder="Escritor" />
                            </Form.Item>
                            <Form.Item
                                name='resumen'
                                label='Resumen'
                                rules={[{ required: true, message:'Por favor ingresar este campo.' }]}
                            >
                                <TextArea placeholder="Resumen" />
                            </Form.Item>
                            <Form.Item
                                name='poema'
                                label='Poema'
                                rules={[{ required: true, message:'Por favor ingresar este campo.' }]}
                            >
                                <TextArea  placeholder="Poema" style={{ height: '500px' }} />
                            </Form.Item>
                            <Form.Item
                                name='img_url'
                                label='Url de la imagen'
                                rules={[{ required: true, message:'Por favor ingresar este campo.' }]}
                                >
                                <Input type='url' placeholder="Url de la Imagen" />
                            </Form.Item>
                                { values?.img_url && 
                                    <img src={values.img_url} height={100} width={100} style={{ borderRadius: 15 }} />
                                }
                            <Form.Item
                                name='tipo'
                                label='Tipo de poema'
                            >
                                <Input type='text' placeholder="Tipo de poema" disabled/>
                            </Form.Item>
                        </Card>
                    </Form>
                    <div style={{ display:'flex', justifyContent:'end', paddingTop: '5px'}}>
                        <Button size="large" style={{ 'marginInlineStart': '8px' }} onClick={() => navigate(`/home/${tipo}/`)} danger ghost>Atras</Button>
                        <Button size="large" style={{ 'marginInlineStart': '8px' }} onClick={()=> form.submit()} type="primary" >{values?.id ? 'Guardar' : 'Crear'}</Button>
                    </div>
                </Spin>
            }
        </> 
    )
}

export default PoemaForm;