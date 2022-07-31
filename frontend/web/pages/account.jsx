import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createAddress, getAllAreas, getAllCities, getAllRegions, SetDefaultShippingAddress, UnsetDefaultShippingAddress, updateAddress } from '../adapters/address'
import { getUserData, updateUserData } from '../adapters/user'
import { useUser } from '../components/auth/context'
import InputField from '../components/common/InputField'
import SelectOption from '../components/common/SelectOption'
import { ErrorToast, SuccessToast } from '../utils/Error'
import { TryCatch } from '../utils/TryCatchHandle'

export default function Profile() {

  const [addressData, setAddressData] = useState({})
  const [updateUser, setUpdateUser] = useState({ name: null, phone: null })
  const [selected, setSelected] = useState(false)
  const [userData, setUserData] = useState(null)
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postCodes, setPostCodes] = useState([]);
  const router = useRouter()
  const user = useUser();

  const handleChange = (e) => {
    const newAddressData = addressData;
    if (e.target.name === 'default_shipping_address') {
      newAddressData[e.target.name] = e.target.checked
    } else {
      newAddressData[e.target.name] = e.target.value
    }
    setAddressData(newAddressData)
  }

  const userDataHandleChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((oldUser) => {
      return { ...oldUser, [name]: value };
    });
  }
  const divisionHandler = async (e) => {
    setDistricts([]);
    setPostCodes([]);
    const newAddressData = addressData
    newAddressData['city'] = undefined;
    newAddressData['area'] = undefined;
    newAddressData['region'] = e.target.value
    setAddressData(newAddressData);
    TryCatch(async () => {
      const response = await getAllCities(e.target.value);
      setDistricts(response.data)
    })

  }
  const districtHandler = (e) => {
    setPostCodes([]);
    const newAddressData = addressData
    newAddressData['area'] = undefined;
    newAddressData['city'] = e.target.value
    setAddressData(newAddressData)
    TryCatch(async () => {
      const response = await getAllAreas(e.target.value);
      setPostCodes(response.data)
    })
  }
  const postCodeHandler = (e) => {
    const newAddressData = addressData
    newAddressData['area'] = e.target.value
    setAddressData(newAddressData)
  }

  const addAddressHandle = (e) => {
    e.preventDefault()
    TryCatch(async () => {
      await createAddress(addressData);
      SuccessToast('New Address Added Successful')
      document.getElementById("myForm").reset()
      window.location.reload()
      fetcher()
    })
  }

  const updateAddressHandle = (e, id) => {
    e.preventDefault()
    TryCatch(async () => {
      if (addressData.full_name || addressData.phone || addressData.region || addressData.city || addressData.area || addressData.address || addressData?.default_shipping_address) {
        await updateAddress(id, addressData);
        SuccessToast('Address Updated')
        fetcher()
      }
    })
  }

  const fetcher = async () => {
    if (user) {
      try {
        const response = await getAllRegions();
        setDivisions(response.data)
        setSelected(false);
        const userResponse = await getUserData();
        setUpdateUser({
          name: userResponse?.data?.name,
          phone: userResponse?.data?.phone,
        })
        userResponse?.data?.address?.map(address => {
          if (address?.default_shipping_address) {
            setSelected(true)
          }
        })
        setUserData(userResponse?.data)
      } catch (error) {

      }
    } else {
      router.push('/auth/sign-in')
    }
  }
  const unsetDefaultShippingAddressHandle = (id) => {
    TryCatch(async () => {
      await UnsetDefaultShippingAddress(id);
      SuccessToast('Default Address Removed Successful')
      setSelected(false);
      fetcher();
    })
  }

  const setDefaultShippingAddressHandle = (id) => {
    if (selected) {
      ErrorToast('Default Shipping Address is already exists')
    } else {
      TryCatch(async () => {
        await SetDefaultShippingAddress(id);
        SuccessToast('Default Address Added Successful')
        setSelected(false);
        fetcher();
      })
    }
  }
  const profileImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    TryCatch(async () => {
      await updateUserData(formData);
      SuccessToast('Profile Image Uploaded Successful')
      fetcher();
    });
  }

  const updateUserHandle = async (e) => {
    e.preventDefault()
    TryCatch(async () => {
      if (updateUser?.full_name || updateUser?.phone) {
        await updateUserData(updateUser)
        SuccessToast('Profile Updated')
        fetcher();
      }
    });
  }

  useEffect(() => {
    fetcher()
  }, [])
  return (
    <div className='container mx-auto p-4 sm:mt-[48px] md:mt-[10px] mobile-page'>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-4 bg-white rounded-md p-4'>
          <h4 className='text-center text-xl border-b-2 pb-2 mb-4'>Profile Information</h4>
          <form id="myForm">
            <InputField name='email' value={userData?.email} label="Email" type="text" fixed={true} />
            <InputField name='full_name' value={updateUser?.name} label="Name" type="text" onChange={userDataHandleChange} />
            <InputField name='phone' value={updateUser?.phone} label="Phone" type="number" onChange={userDataHandleChange} />
            <center>
              <button onClick={updateUserHandle} className='bg-[yellow] p-2 text-black rounded-lg mt-4 transition-all duration-150 px-4'><b>Update</b></button>
            </center>
          </form>
        </div>
        <div className='flex flex-col justify-center items-center col-span-2 rounded-md p-4'>
          <label htmlFor='profileImage' className='w-36 h-36 overflow-hidden flex justify-center items-center bg-cover bg-center bg-no-repeat hover:cursor-pointer rounded-full border'
            style={{ backgroundImage: `url(${userData?.image ? userData?.image?.url : '/images/default-user.png'})` }}
          />
          <input onChange={profileImageUpload} type='file' id='profileImage' className='hidden' accept="image/png, image/gif, image/jpeg, image/webp" />
          <h4 className='text-xl text-center mt-8'>Picture</h4>
        </div>
      </div>

      {/* Addresses */}

      <div className='col-span-4 bg-white rounded-md p-2'>
        <h4 className='text-center text-xl border-b-2 pb-2 mb-4'>New Address</h4>
        <form>
          <InputField name='full_name' label="Name" type="text" onChange={handleChange} />
          <InputField name='phone' label="Phone" type="number" onChange={handleChange} />
          <SelectOption name='region' options={divisions} label="Region" type="text" onChange={divisionHandler} address={true} />
          <SelectOption name='city' options={districts} label="City" type="text" onChange={districtHandler} address={true} />
          <InputField name='area' label="Area" type="text" onChange={postCodeHandler} />
          <InputField name='address' label="Address" type="text" onChange={handleChange} />
          <div className='flex justify-center mt-4'>
            <div className='flex items-center'>
              <input name='default_shipping_address' className='mr-1' onChange={handleChange} type='checkbox' />
              <label htmlFor='default_shipping_address'>Default Shipping Address <i className="fas fa-shipping-fast"></i></label>
            </div>
          </div>
          <center>
            {
              addressData !== {}
              && <button onClick={addAddressHandle} className='bg-[yellow] p-2 text-black rounded-lg mt-4 transition-all duration-150 px-4'><b>Submit</b></button>
            }
          </center>
        </form>
      </div>

      <div className='col-span-4 bg-white rounded-md p-4'>
        {
          userData?.address?.length ?
            <h4 className='text-center text-xl border-b-2 pb-2 mb-4'>Addresses</h4> : null
        }
        {
          userData?.address?.length ? userData?.address?.map((address, index) => {
            return (
              <span key={index}>
                <InputField name='full_name' value={address?.full_name} label="Name" type="text" onChange={handleChange} />
                <InputField name='phone' value={address?.phone} label="Phone" type="number" onChange={handleChange} />
                <SelectOption name='region' selected={address?.region} options={divisions} label="Region" type="text" onChange={divisionHandler} address={true} />
                <SelectOption name='city' selected={address?.city} options={districts} label="City" type="text" onChange={districtHandler} address={true} />
                <InputField name='area' value={address?.area} label="Area" type="text" onChange={postCodeHandler} address={true} />
                <InputField name='address' value={address?.address} label="Address" type="text" onChange={handleChange} />
                <div className='flex justify-center mt-4'>
                  <div className='flex items-center'>
                    {
                      address?.default_shipping_address ? <button onClick={() => unsetDefaultShippingAddressHandle(address?._id)} className='cursor-pointer text-red-700'>Remove</button>
                        : <button onClick={() => setDefaultShippingAddressHandle(address?._id)} className='cursor-pointer text-lime-700'>Add</button>
                    }
                    <label htmlFor='default_shipping_address' className='mr-2'>Default Shipping Address <i className="fas fa-shipping-fast"></i></label>
                  </div>
                </div>
                <center>
                  <button onClick={(e) => updateAddressHandle(e, address?._id)} className='bg-[yellow] p-2 text-black rounded-lg mt-4 transition-all duration-150 px-4 mb-2'><b>Update</b></button>
                </center>
              </span>
            )
          }) : null
        }
      </div>
    </div>
  )
}
