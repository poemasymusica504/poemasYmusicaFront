import { Card, Form, Input } from "antd"
import { poemaDTO } from "../../../infrastructure/repositories/poemas"
import TextArea from "antd/es/input/TextArea"

interface PoemaFormProps {
    values?: poemaDTO,
    isLoading?: boolean,
    tipo: string,
}

const PoemaForm: React.FC<PoemaFormProps> = ({ values, tipo, isLoading}) => {
    console.log(values, isLoading)
    return (
        <>
            { !isLoading && 
                <Form
                    layout="vertical"
                    initialValues={{
                        titulo: values?.titulo,
                        escritor: values?.escritor,
                        resumen: values?.resumen,
                        tipo: values?.tipo ?? tipo,
                        poema: values?.poema,
                        img_url: values?.img_url,
                    }}
                >
                    <Card
                    >
                        <Form.Item
                            name='titulo'
                            label='Titulo'
                        >
                            <Input type='text' placeholder="Titulo" />
                        </Form.Item>
                        <Form.Item
                            name='escritor'
                            label='Escritor'
                        >
                            <Input type='text' placeholder="Escritor" />
                        </Form.Item>
                        <Form.Item
                            name='resumen'
                            label='Resumen'
                        >
                            <TextArea placeholder="Resumen" />
                        </Form.Item>
                        <Form.Item
                            name='poema'
                            label='Poema'
                        >
                            <TextArea  placeholder="Poema" />
                        </Form.Item>
                        <Form.Item
                            name='img_url'
                            label='Url de la imagen'
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
            }
        </> 
    )
}

export default PoemaForm;