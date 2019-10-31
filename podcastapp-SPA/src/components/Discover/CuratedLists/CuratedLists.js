import React, { useState, useEffect } from 'react';
import CuratedListCard from '../../CuratedListCard/CuratedListCard';
import { useSpring, a } from 'react-spring';

const CuratedLists = ({ curatedLists, getListPodcasts, direction, amount, loading }) => {
    const [directionStyle, setDirectionStyle] = useState();
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
    const normal = useSpring({ from: { opacity: 1 }, opacity: 1 });
    const right = useSpring({ from: { transform: 'translateX(0px)' }, transform: 'translateX(-900px)' });
    const left = useSpring({ from: { transform: 'translateX(-900px)' }, transform: 'translateX(0px)' });

    useEffect(() => {
        direction === 'cl-right' && setDirectionStyle(right);
        direction === 'cl-left' && setDirectionStyle(left);
    }, [direction])

    return (
        <a.div className="selection-component" style={loading ? normal : fade}>
        {amount === 20
            ? <h1 className="title">Curated</h1>
            : null
        }
            
            <a.div className="componentCarousel" style={directionStyle} > {
                curatedLists.map((curatedList, i) => {
                    if (i < amount)
                        return <CuratedListCard
                            key={curatedList.id}
                            id={curatedList.id}
                            title={curatedList.title}
                            image={curatedList.podcasts[0].thumbnail}
                            podcasts={curatedList.podcasts}
                            getListPodcasts={getListPodcasts}
                            margin={amount} //amount(to show) and margin are coincidentally the same i.e. display 10 (carousel) 10px apart or display all 20 w/ 20px apart
                        />
                })
            }
            </a.div>
        </a.div>
    )
}

export default CuratedLists;
