import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css'
import CloseIcon from './close.svg'
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, className, isOpened, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState:{errors}, reset} = useForm<IReviewForm>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if  (data.message) {
                setSuccesForm(true);
                reset();
            } else {
                setErrorForm('что-то пошло не так');
            }
        } catch (e) {
            if (e instanceof Error) {
                setErrorForm(e.message);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={cn(styles.reviewForm, className)}
                 {...props}>
                <Input
                    {...register('name',
                    {required: {value: true, message: 'Заполните имя'},})}
                    error={errors.name} placeholder={'Имя'}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input
                    {...register('title', {required: {value: true, message: 'Заполните заголовок'},})}
                       placeholder={'Заголовок отзыва'}
                    error={errors.title}

                    className={styles.title}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.rating}>
                <span>

                </span>
                    <Controller control={control} name={'rating'} render={({field,}) => (
                        <Rating
                            isEditable
                            {...register('rating', {required: {value: true, message: 'поставьте оценку'}})}
                            rating={field.value}
                            error={errors.rating}
                            setRating={field.onChange}
                            ref={field.ref}
                            tabIndex={isOpened ? 0 : -1}
                        />

                    )}/>
                </div>
                <TextArea
                      {...register('description',{required: {value: true, message: 'Заполните заголовок'},})}
                      className={styles.textArea}
                      placeholder={'Текст отзыва'}
                      error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance={'primary'} tabIndex={isOpened ? 0 : -1}>Отправить</Button>
                    <span className={styles.info}> * Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {succes && <div className={cn(styles.succes, styles.panel)}>
                <div className={styles.succesTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо. Ваш отзыв будет опубликован после проверки
                </div>
                <CloseIcon className={styles.closeIcon} onClick={()=>setSuccesForm(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Ошибка! Попробуйте обновить страницу
                <CloseIcon className={styles.closeIcon}  onClick={()=> setErrorForm(undefined)}/>
            </div>}
        </form>

    )
}