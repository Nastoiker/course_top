
import React, {useState} from 'react';
import {Button, Htag, Paragraph, Rating, Tag, Input, TextArea} from '../components';
import {withLayot} from "../Layout/Layot";
import {GetStaticProps} from "next";
import axios from 'axios';
import {MenuItem} from "../interfaces/menu.interfaces";
function Home({menu }: HomeProps): JSX.Element
{
    const [rating, setRating] = useState<number>(4);
  return (
    
    <>
      <Htag tag='h1'>Привет</Htag>
      <Button appearance='primary' className="sadaDsd" arrow='right'>кнопка</Button>
      <Button appearance='ghost' className="sadaDsdsd">кнопка2</Button>
      <Paragraph size='low'>low</Paragraph>
      <Paragraph>medium</Paragraph>
      <Paragraph size='big'>big</Paragraph>
      <Tag size='medium' color='ghost'>ghost</Tag>
      <Tag size='medium' color='primary'>ghost</Tag>
      <Tag size='medium' color='green'>ghost</Tag>
      <Tag size='medium' color='gray'>ghost</Tag>
      <Tag size='medium' color='red'>ghost</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
        <ul>
            {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
        </ul>
        <Input placeholder='тест' />
        <TextArea placeholder='Текст отзыва'/>

    </>
  )
}
export default withLayot(Home);
export const getStaticProps: GetStaticProps<HomeProps>= async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    }
};
interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}