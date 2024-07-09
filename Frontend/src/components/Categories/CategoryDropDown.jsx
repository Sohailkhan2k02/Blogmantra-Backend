import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const CategoryDropDown = props => {
    //dispatch 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch])

    //select categories
    const category = useSelector(state => state?.category);
    const { categoryList, loading, serverErr, appErr } = category;
    const allCategories = categoryList?.map(category => {
        return {
            label: category?.title,
            value: category?._id,
        }
    })

    //handleChange
    const handleChange = value => {
        props.onChange("category", value);
    };
    //handleBlur
    const handleBlur = () => {
        props.onBlur("category", true);
    };

    return (
        <div style={{ margin: "1rem 0" }}>
            {loading ? (
                <h3 className="text-base text-green-600">
                    Product categories list are loading please wait...
                </h3>
            ) : (
                <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="category"
                    options={allCategories}
                    value={props?.value?.label}
                />
            )}
            {/* Display */}
            {props?.error && (
                <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
            )}
        </div>
    )
}

export default CategoryDropDown