import { Button, Card, Flex } from "antd";
import { poemaDTO } from "../../../infrastructure/repositories/poemas";
import useUserStore from "../../../infrastructure/context/User";
import { useNavigate } from "react-router-dom";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";

interface PoemaCardProps {
    poema: poemaDTO
}

const PoemaCard: React.FC<PoemaCardProps> = ({ poema }) => {

    const { Meta } = Card;

    const { admin } = useUserStore((state) => state)

    const navigate = useNavigate();

    const ButtonOption = () => (
        <Flex justify="end" style={{ marginRight: '2vh' }}>
            { admin == true ? (
                    <Button type="primary" onClick={() => navigate(`editar/${poema.id}/`)} icon={<EditOutlined />}>Editar</Button> 
                ) : (
                    <Button type="default"  onClick={() => navigate(`${poema.id}/`)} icon={<ReadOutlined />} >Leer</Button>
                )
            }
        </Flex>
    )

    return (
       <Card
            hoverable
            cover={<img alt="Imagen Poema" width={350} height={200} src={poema.img_url} style={{ borderRadius: 15, padding: 10}}/>}
            style={{ textAlign: 'justify' }}
            actions={[
                <ButtonOption />,
            ]}
        >

            <Meta 
                title={<h3 style={{ margin: 0 }}>{poema.titulo}</h3>}
                description={
                    <div style={{ height: '70px', maxHeight: '68px', overflowY: 'auto' }}>
                        {poema.resumen}
                    </div>
                }
            />
            
       </Card> 
    )
}

export default PoemaCard;