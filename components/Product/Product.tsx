import {ProductProps} from "./Product.props";
import cn from "classnames";
import styles from './Product.module.css'
import {Rating} from "../Rating/Rating";
import {Card} from "../Card/Card";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceRu} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import {ForwardedRef, forwardRef, useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from 'framer-motion';

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({className, product,...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, SetIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);
    const variants = {
        visible: {opacity: 1,height: 'auto'},
        hidden: {opacity: 0, height: 0}
    }
    const scrollToReview =  () => {
        SetIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        reviewRef.current?.focus();
    }
    return (
        <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image
                    src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title}
                    height={70}
                    width={70}
                />

            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                <span><span className={"visuallyHidden"}>цена</span>{priceRu(product.price)}</span>
                {product.oldPrice &&
                <Tag className={styles.oldPrice} color={'green'}>
                    <div className={styles.creditTitle} aria-hidden={true}>скидка</div>
                    {priceRu(product.price-product.oldPrice)}
                </Tag>}
            </div>
            <div className={styles.credit}>{priceRu(product.credit)}/<span className={styles.month}>мес.</span></div>
            <div className={styles.rating}>
                <span className={"visuallyHidden"}>{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                <Rating rating={product.reviewAvg ?? product.initialRating}/>
            </div>
            <div className={styles.tags}>{product.categories.map(c => <Tag color='ghost' className={styles.category} key={c}>{c}</Tag>)}</div>
            <div className={styles.priceTitle} aria-hidden={true}> цена</div>
            <div className={styles.creditTitle} aria-hidden={true}>Кредит</div>
            <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв','отзыва', 'отзывов'])}</a></div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
                {product.characteristics.map(c => <div key={c.name} className={styles.characteristics}>
                    <span className={styles.characteristicsName}>{c.name}</span>
                    <span className={styles.characteristicsDots}></span>
                    <span className={styles.characteristicsValue}>{c.value}</span>
                </div>)}
            </div>
            <div className={styles.advBlock}>
                {product.advantages &&
                <div className={styles.advantages}>
                    <div className={styles.AdvantagesTitle}>Преимущества</div>
                    <div>{product.advantages}</div>
                </div>}
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div className={styles.disAdvantagesTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                </div>}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
                <Button appearance='primary'>
                    Узнать подробнеее
                </Button>
                <Button
                    appearance='ghost'

                    className={styles.reviewButton}

                    arrow={isReviewOpened ? 'down' : 'right'}
                onClick={() => SetIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}>
                    Читать отзывы
                </Button>
            </div>
        </Card>
            <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} ref={reviewRef} initial='hidden'>
                <Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
                    {product.reviews.map(r =>(
                        <div key={r._id}>
                            <Review review={r}/>
                            <Divider />
                        </div>

                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>

        </div>
    )
}));