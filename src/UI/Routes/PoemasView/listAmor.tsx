import { FC } from "react"
import { poemaDTO } from "../../../infrastructure/repositories/poemas"
import { Col, Row } from "antd"
import PoemaCard from "../../Components/Poemas/card"

interface listAmorPros {
    list: poemaDTO[] | []
}

const listAmor: FC<listAmorPros> = ({ list }) => {
    
    return (
        <Row gutter={24} wrap style={{ alignContent: 'center', justifyContent: 'center' }}>
            {list && list.map((poema) => 
                <Col 
                    key={poema.id}
                    className="gutter-row"  
                    style={{ padding: 12 }}
                    xs={20}
                    sm={15}
                    md={12}
                    lg={7}
                >
                   <PoemaCard  poema={poema} />
                </Col>
            )}
        </Row>
    )
}

export default listAmor;