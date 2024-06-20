import { FC, useEffect, useState } from "react"
import { poemaDTO } from "../../../infrastructure/repositories/poemas"
import { Col, Row } from "antd"
import PoemaCard from "../../Components/Poemas/card"

interface listAmorPros {
    list: poemaDTO[] | []
}

const listAmor: FC<listAmorPros> = ({ list }) => {

    const [ span, setSpan ] = useState(6)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 420) {
                setSpan(22)
            } else if (window.innerWidth < 700) {
                setSpan(10)
            } else {
                setSpan(6)
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
	}, []);
    
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap style={{ alignContent: 'center', justifyContent: 'center' }}>
            {list && list.map((poema) => 
                <Col 
                    key={poema.id}
                    className="gutter-row" 
                    span={span} 
                    style={{ padding: 12 }}
                >
                   <PoemaCard  poema={poema} />
                </Col>
            )}
        </Row>
    )
}

export default listAmor;