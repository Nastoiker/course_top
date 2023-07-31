import {Button, Htag, Input, Paragraph, Rating, Tag, TextArea} from "../components";
import {withLayot} from "../Layout/Layot";

export function Error500(): JSX.Element
{
    return (

        <>
            <Htag tag='h1'>ошибка 500</Htag>


        </>
    )
}
export default withLayot(Error500);
