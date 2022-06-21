import { Chat } from "../../mongodb/common";

export const checkChatExist = async (query) => {
  try {
    return await Chat.findOne(query).lean();
  } catch (err) {
    console.log(err);
  }
}

export const createCustomerAndVendorChat = async (data) => {
  try {
    return await new Chat(data).save();
  } catch (err) {
    console.log(err);
  }
}

export const createVendorAndAdminChat = async (data) => {
  try {
    return await new Chat(data).save();
  } catch (err) {
    console.log(err);
  }
}

export const addMessageInChat = async (query, message) => {
  try {
      return await Chat.findOneAndUpdate(query, { $push: { messages: message } }, { new: true }).lean().exec()
  } catch (err) {
      console.log(err);
  }
}

export const getVendorMessage = async (query) => {
  try {
    return await Chat.find(query).sort({updatedAt: -1}).populate({
      path: 'customer_id',
      model: 'Customer',
      select: 'name image.url'
    }).lean();
  } catch (err) {
    console.log(err);
  }
}


//customer

export const getCustomerMessage = async (query) => {
  try {
    return await Chat.find(query).sort({updatedAt: -1}).populate({
      path: 'vendor_id',
      model: 'Vendor',
      select: 'seller_account.shop_name logo.url'
    }).lean();
  } catch (err) {
    console.log(err);
  }
}

//admin

export const getAdminMessage = async (query) => {
  try {
    return await Chat.find(query).sort({updatedAt: -1}).populate({
      path: 'vendor_id',
      model: 'Vendor',
      select: 'seller_account.shop_name logo.url'
    }).lean();
  } catch (err) {
    console.log(err);
  }
}

export const getSpecificVendorMessage = async (query) => {
  try {
    return await Chat.find(query).sort({updatedAt: -1}).populate({
      path: 'vendor_id',
      model: 'Vendor',
      select: 'seller_account.shop_name logo.url'
    }).lean();
  } catch (err) {
    console.log(err);
  }
}
