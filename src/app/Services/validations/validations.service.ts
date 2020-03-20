import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationsService {

  constructor() { }

  readonly signin = {
    loginId: {
      label: 'User name',
      minLength: 6,
      maxLength: 16,
      err_msg_required: 'User name is required',
      err_msg_minLength: 'User name must be atleast 8 characters'
    },
    password: {
      label: 'Password',
      minLength: 6,
      maxLength: 31,
      err_msg_required: 'Password is required',
      err_msg_minLength: 'Password must be atleast 8 characters'
    }
  }

  readonly permissions = {
    name: {
      label: 'Permission Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Permission name is required',
      err_msg_minLength: 'Permission name must be atleast 4 characters'
    },

    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    },

    permissionAccess: {
      label: "Permission Access",
    }
  }

  readonly roles = {
    name: {
      label: 'Role Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Role name is required',
      err_msg_minLength: 'Role name must be atleast 4 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    },
    aliasName: {
      label: "Alias Name",
      err_msg_required: 'Alias name is required',
    }
  }

  readonly assetCategory = {
    categoryName: {
      label: 'Asset Category Name',
      minLength: 2,
      maxLength: 25,
      err_msg_required: 'Asset category name is required',
      err_msg_minLength: 'Asset category name must be atleast 2 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    }
  }

  readonly CreateassetType = {
    assetType: {
      label: 'Asset Type',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Asset type is required',
      err_msg_minLength: 'Asset type must be atleast 4 characters'
    },
    description: {
      label: 'Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Description is required',
      err_msg_minLength: 'Description must be atleast 5 characters'
    },
    assetCategoryName: {
      label: 'Asset Category Name',
      minLength: 5,
      maxLength: 25,
      err_msg_required: 'Asset category name is required',
      err_msg_minLength: 'Asset category name must be atleast 5 characters'
    }
  }

  readonly userCreation = {
    firstName: {
      label: 'First Name',
      minLength: 2,
      maxLength: 16,
      err_msg_required: "First name is required",
      err_msg_minLength: "First name must be atleast 2 characters",
    },
    lastName: {
      label: 'Last Name',
      minLength: 1,
      maxLength: 16,
      err_msg_required: "Last name is required",
    },
    userName: {
      label: 'User Name',
      minLength: 6,
      maxLength: 32,
      err_msg_required: "User name is required",
      err_msg_minLength: "User name must be atleast 6 characters",
    },
    emailId: {
      label: 'Email',
      minLength: 1,
      maxLength: 64,
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
      err_msg_pattern: "Please enter valid email address",
      err_msg_required: 'Email is required'
    },
    password: {
      label: 'Password',
      minLength: 6,
      maxLength: 31,
      err_msg_required: 'Password is required',
      err_msg_minLength: "Password should be in between 6 to 32 characters",
    },
    confirmPassword: {
      label: 'Confirm Password',
      minLength: 6,
      maxLength: 31,
      err_msg_required: 'Confirm Password is required',
      err_msg_minLength: "Confirm Passowrd should be in between 6 to 32 characters",
      err_msg_mustMatch: "Passowrd and Confirm Password does not match"
    },
    phoneNumber: {
      label: 'Phone Number',
      minLength: 10,
      maxLength: 10,
      err_msg_minLength: "Phone number should be 10 digit numberic only",
      err_msg_required: 'Phone number is required'
    },
    country: {
      label: 'Country',
      err_msg_required: 'Country is required'
    },
    state: {
      label: 'State',
      err_msg_required: 'State is required'
    },
    city: {
      label: 'City',
      err_msg_required: 'City is required'
    },
    role: {
      label: 'Role',
      err_msg_required: 'Role is required'
    },
    assetAccess: {
      label: "Asset Access",
      err_msg_required: 'Asset access is required'
    }
  }

  readonly creastesite = {
    country: {
      label: 'Country',
      err_msg_required: 'Country is required',
    },
    state: {
      label: 'State',
      err_msg_required: 'State is required'
    },
    city: {
      label: 'City',
      err_msg_required: 'City is required'
    },
    siteName: {
      label: 'Site Name',
      minLength: 5,
      maxLength: 25,
      err_msg_required: 'Site name is required',
      err_msg_minLength: 'Site name must be atleast 5 characters'
    }
  }

  readonly siteArchitecture = {
    noOfModules: {
      label: 'No of Modules',
      minLength: 1,
      maxLength: 2,
      err_msg_required: 'No of modules is required',
      err_msg_minLength: 'No of modules must be atleast 1 digit',
    },
    noOfPacks: {
      label: 'No of Packs',
      minLength: 1,
      maxLength: 2,
      err_msg_required: 'No of packs is required',
      err_msg_minLength: 'No of packs must be atleast 1 digit',
    }
  }

  readonly Siterequirement = {
    power: {
      label: 'Power',
      minLength: 1,
      maxLength: 2,
      err_msg_required: 'Power is required',
      err_msg_minLength: 'Power must be atleast 1 digit',
    },
    voltage: {
      label: 'Voltage',
      minLength: 1,
      maxLength: 2,
      err_msg_required: 'Voltage is required',
      err_msg_minLength: 'Voltage must be atleast 1 digit',
    }
  }
  readonly batteryCreation = {
    serialNumber: {
      label: 'Serial Number',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Serial number is required',
      err_msg_minLength: 'Serial number must be atleast 1 digit',
    },
    storageTemperature: {
      label: 'Storage Temperature',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Storage temperature is required',
      err_msg_minLength: 'Storage temperature must be atleast 1 digit',
    },
    ratedBatteryCapacity: {
      label: 'Rated Battery Capacity',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Rated battery capacity is required',
      err_msg_minLength: 'Rated battery capacity must be atleast 1 digit',
    },

    specifiedCharge: {
      label: 'Specified Charge',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Specified charge is required',
      err_msg_minLength: 'Specified charge must be atleast 1 digit',
    },
    dimensions: {
      label: 'Dimensions',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Dimensions is required',
      err_msg_minLength: 'Dimensions must be atleast 1 digit',
    },
    dischargeRate: {
      label: 'Discharge Rate',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Discharge rate is required',
      err_msg_minLength: 'Discharge rate must be atleast 1 digit',
    },
    nominalVoltage: {
      label: 'Nominal Voltage',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Nominal voltage is required',
      err_msg_minLength: 'Nominal voltage must be atleast 1 digit',
    },
    chargingPolicy: {
      label: 'Charging Policy',
      minLength: 1,
      maxLength: 16,
      err_msg_required: 'Charging policy is required',
      err_msg_minLength: 'Charging policy must be atleast 1 digit',
    },
    operatingTemperature: {
      label: 'Operating Temperature',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Operating temperature is required',
      err_msg_minLength: 'Operating temperature must be atleast 1 digit',
    },
    manufacturingDate: {
      label: 'Manufacturing Date',
      err_msg_required: 'Manufacturing date is required',
    },
    warrantyPeriod: {
      label: 'Warranty Period',
      minLength: 1,
      maxLength: 16,
      err_msg_required: 'Warranty period is required',
      err_msg_minLength: 'Warranty period must be atleast 1 numeric digit',
    },
    assetCategory: {
      label: 'Asset Category',
      minLength: 1,
      maxLength: 16,
      err_msg_required: 'Asset category is required',
    }
  }

  readonly createPacks = {
    packName: {
      label: 'Pack Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Pack name is required',
      err_msg_minLength: 'Pack name  must be atleast 4 characters',
    },
    packDescription: {
      label: 'Pack Description',
      minLength: 5,
      maxLength: 200,
      err_msg_required: 'Pack description is required',
      err_msg_minLength: 'Pack description  must be atleast 5 characters',
    },
    siteName: {
      label: 'Site Name',
      err_msg_required: 'Site name is required',
    }
  }

  readonly moduleCreation = {
    moduleName: {
      label: 'Module Name',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Module Name is required',
      err_msg_minLength: 'Module Name must be atleast 4 characters',
    },
    voltage: {
      label: 'Voltage',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Voltage is required',
      err_msg_minLength: 'Voltage must be atleast 4 characters',
    },
    capacity: {
      label: 'Capacity',
      minLength: 4,
      maxLength: 25,
      err_msg_required: 'Capacity is required',
      err_msg_minLength: 'Capacity must be atleast 4 characters',
    },
    life: {
      label: 'Life',
      minLength: 1,
      maxLength: 25,
      err_msg_required: 'Life is required',
      err_msg_minLength: 'Life must be atleast 1 character',
    },
    dateOfManufacture: {
      label: 'Date Of Manufacture',
      err_msg_required: 'Date of manufacture is required',
    },
    weight: {
      label: 'Weight',
      minLength: 1,
      maxLength: 5,
      err_msg_required: 'Weight is required',
      err_msg_minLength: 'Weight must be atleast 1 numerric digit',
    },
    warranty: {
      label: 'Warranty',
      err_msg_required: 'Warranty is required',
    },
    packName: {
      label: 'Pack Name',
      err_msg_required: 'Pack name is required',
    }
  }
}
