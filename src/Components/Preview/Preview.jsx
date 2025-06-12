import React, { useEffect, useState } from "react";
import Layouts from "../Pages/Layouts/Layouts";
import "./preview.css";
import classnames from "classnames";
import loadingImg from "../../images/icons/Group 3.svg";
import fileImg from "../../images/icons/Excel-default.svg";

import contractPdf from './SRM Pharma Contract.pdf'
import pricingPdf from './Product_Pricing_Table.pdf'
import demoexcel from './ContractEntities.xlsx'


import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import toast from "react-hot-toast";
import request from "../../api/api";
import { useLocation } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const tier = {
    "tier_summary": [
        {
            "tier_level": 1,
            "purchase_volume_min": 0,
            "purchase_volume_max": 249999,
            "price_discount_percentage": 10.0,
            "administrative_fee_percentage": 2.0,
            "rebate_percentage": 0.0
        },
        {
            "tier_level": 2,
            "purchase_volume_min": 250000,
            "purchase_volume_max": 999999,
            "price_discount_percentage": 15.0,
            "administrative_fee_percentage": 2.0,
            "rebate_percentage": 1.5
        },
        {
            "tier_level": 3,
            "purchase_volume_min": 1000000,
            "purchase_volume_max": null,
            "price_discount_percentage": 20.0,
            "administrative_fee_percentage": 3.0,
            "rebate_percentage": 3.0
        }
    ],
    "products": [
        {
            "ndc_number": "65483-1021-30",
            "product_name": "Cardiolex 10mg",
            "size": "30 tablets",
            "wac_price": "$195.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$175.50",
                    "savings": "$19.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$165.75",
                    "savings": "$29.25"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$156.00",
                    "savings": "$39.00"
                }
            ]
        },
        {
            "ndc_number": "65483-1022-30",
            "product_name": "Cardiolex 20mg",
            "size": "30 tablets",
            "wac_price": "$275.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$247.50",
                    "savings": "$27.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$233.75",
                    "savings": "$41.25"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$220.00",
                    "savings": "$55.00"
                }
            ]
        },
        {
            "ndc_number": "65483-1023-30",
            "product_name": "Cardiolex 40mg",
            "size": "30 tablets",
            "wac_price": "$395.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$355.50",
                    "savings": "$39.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$335.75",
                    "savings": "$59.25"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$316.00",
                    "savings": "$79.00"
                }
            ]
        },
        {
            "ndc_number": "65483-2041-60",
            "product_name": "Neurovex 25mg",
            "size": "60 capsules",
            "wac_price": "$425.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$382.50",
                    "savings": "$42.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$361.25",
                    "savings": "$63.75"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$340.00",
                    "savings": "$85.00"
                }
            ]
        },
        {
            "ndc_number": "65483-2042-60",
            "product_name": "Neurovex 50mg",
            "size": "60 capsules",
            "wac_price": "$625.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$562.50",
                    "savings": "$62.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$531.25",
                    "savings": "$93.75"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$500.00",
                    "savings": "$125.00"
                }
            ]
        },
        {
            "ndc_number": "65483-2043-60",
            "product_name": "Neurovex 100mg",
            "size": "60 capsules",
            "wac_price": "$895.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$805.50",
                    "savings": "$89.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$760.75",
                    "savings": "$134.25"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$716.00",
                    "savings": "$179.00"
                }
            ]
        },
        {
            "ndc_number": "65483-3051-01",
            "product_name": "Immunolex 150mg Injection",
            "size": "1 vial",
            "wac_price": "$1250.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$1125.00",
                    "savings": "$125.00"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$1062.50",
                    "savings": "$187.50"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$1000.00",
                    "savings": "$250.00"
                }
            ]
        },
        {
            "ndc_number": "65483-3052-01",
            "product_name": "Immunolex 300mg Injection",
            "size": "1 vial",
            "wac_price": "$2450.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$2205.00",
                    "savings": "$245.00"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$2082.50",
                    "savings": "$367.50"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$1960.00",
                    "savings": "$490.00"
                }
            ]
        },
        {
            "ndc_number": "65483-4071-01",
            "product_name": "Respiraclear 50mcg Inhaler",
            "size": "1 inhaler",
            "wac_price": "$185.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$166.50",
                    "savings": "$18.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$157.25",
                    "savings": "$27.75"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$148.00",
                    "savings": "$37.00"
                }
            ]
        },
        {
            "ndc_number": "65483-4072-01",
            "product_name": "Respiraclear 100mcg Inhaler",
            "size": "1 inhaler",
            "wac_price": "$245.00",
            "total_tiers": 3,
            "tiers": [
                {
                    "tier": 1,
                    "discount": "10%",
                    "final_price": "$220.50",
                    "savings": "$24.50"
                },
                {
                    "tier": 2,
                    "discount": "15%",
                    "final_price": "$208.25",
                    "savings": "$36.75"
                },
                {
                    "tier": 3,
                    "discount": "20%",
                    "final_price": "$196.00",
                    "savings": "$49.00"
                }
            ]
        }
    ],
    "summary": {
        "total_products": 10,
        "total_tiers": 3
    }
}

const result = {
  "result": {
    "Contract Offer": [
      {
        "field": "startDate",
        "answer": "2025/07/01"
      },
      {
        "field": "endDate",
        "answer": "2030/06/30"
      },
      {
        "field": "document Id",
        "answer": "PPPH18SR01"
      },
      {
        "field": "document Name",
        "answer": "Premier Health Alliance Agreement with SRM Pharmaceuticals"
      },
      {
        "field": "document Type",
        "answer": "GROUP"
      },
      {
        "field": "document Status",
        "answer": "Active"
      },
      {
        "field": "document Version Number",
        "answer": "1"
      },
      {
        "field": "document Version Creation Date",
        "answer": "5/23/2025"
      },
      {
        "field": "owner",
        "answer": "Administrator"
      },
      {
        "field": "program only",
        "answer": "NO"
      },
      {
        "field": "source type",
        "answer": "NEW"
      }
    ],
    "Product Group": [
      {
        "field": "adjust By",
        "answer": "%"
      },
      {
        "field": "category Pricing",
        "answer": "PRICE"
      },
      {
        "field": "price List Name",
        "answer": "WAC"
      },
      {
        "field": "Pricing Method",
        "answer": "TIER"
      },
      {
        "field": "Number of Tiers",
        "answer": "3"
      }
    ]
  }
}

const accordionData = [
  {
    name: "Contract Offer",
    data: Object.entries({
      author: "Admnistrator",
      customer: "39882",
      startDate: "7/1/2025",
      endDate: "6/30/2028",
      'document Id': "SM23457890",
      'document Name': "Premier Health Alliance Agreement",
      'document Type': "GPO",
      'document Status': "Active",
      'document Version Number': "DOC1.0",
      'document Version Creation Date': "5/23/2025",
      'owner': "Administrator",
      'program Only': false,
      'source Type': "New",
    }),
  },
  // {
  //   name: "Business Segment",
  //   data: Object.entries({
  //     'import Action': "add Modify",
  //     'business Segment Template Name': "Business Segment",
  //     'section Name': "Business Segment",
  //   }),
  // },
  {
    name: "Product Group",
    data: Object.entries({
      'adjust By': "%",
      'category Pricing': "Pricing",
      'price List Name': "WAC",
      'pricing Method': "Tier",
      'number Of Tiers': 3,
    }),
  },
  {
    name: "Tiered LI",
    data: Object.entries({
     ' base Price': "$20,000",
      'product Number': "PR456678",
      'direct Or Indirect': "DIRECT",
      'minimum Order Quantity': 50000,
      'minimum Order Block': true,
      'minimumOrderPenalty': "$2,500",
    }),
  },
];

const loadingStatus =[
  "Analyzing your PDF...",
  "Looking for key data points and patterns…",
  "Extracting contract offer, business segment, product group, Tired LI summary...",
  "Smart AI is reading between the lines…",
  "Ensuring accuracy before showing results…",
  "Ready! Loading your insights…",
]


function Preview() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [accordionOpen, setAccordionOpen] = useState("");
  const [responseData,setResponseData] = useState({})
  const [contractOffer,setContractOffer] = useState([])
  const [productGroup,setProductGroup] = useState([])
  const [tierData,setTierData] = useState({})
  const { files } = location.state || {};

const [contractUrl, setContractUrl] = useState('');
const [priceUrl, setPriceUrl] = useState('');
const [statusIndex, setStatusIndex] = useState(0);

  

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

    useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setStatusIndex((prevIndex) => (prevIndex + 1) % loadingStatus.length);
    }, 8000); // 10 seconds

    return () => clearInterval(interval); // cleanup
  }, [isLoading]);

  const toggleAccordion = (id) => {
    if (accordionOpen.includes(id)) {
      setAccordionOpen((prev) => prev.filter((item) => item !== id)); // remove if already open
    } else {
      setAccordionOpen((prev) => [...prev, id]); // add if not open
    }
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(()=>{
    if(location?.state?.pricing){
      setTierData(location?.state?.pricing)
    }else{
      setTierData(tier)
    }
  },[location])

  const fetchPreviewData = ()=>{
    setIsLoading(true)
    request({
      url:'/contract2xml/contract/extract-fields',
      method:'POST',
    }).then((res)=>{
      setIsLoading(false)
        setResponseData(res.contract)
        setContractOffer(res?.contract['Contract Offer'])
        setProductGroup(res?.contract['Product Group'])
    }).catch((err)=>{
      setIsLoading(false)
      setContractOffer(result.result['Contract Offer'])
      setProductGroup(result.result['Product Group'])
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchPreviewData()
  },[])

  useEffect(() => {
  if (files?.contract) {
    setContractUrl(URL.createObjectURL(files.contract));
  }
  if (files?.price) {
    setPriceUrl(URL.createObjectURL(files.price));
  }

  return () => {
    // Revoke URLs on cleanup
    if (contractUrl) URL.revokeObjectURL(contractUrl);
    if (priceUrl) URL.revokeObjectURL(priceUrl);
  };
}, [files]);

const exportResultToExcel = () => {
  toast.loading('Downloading....',{duration:Infinity})
  if(responseData?.contract){
const dataSections = responseData?.contract || result.result;
  const combinedSheetData = [];

  Object.entries(dataSections).forEach(([sectionName, data]) => {
    if (!Array.isArray(data)) return;

    // Section heading
    combinedSheetData.push({ Field: sectionName.toUpperCase(), Answer: '' });

    // Rows for this section
    data.forEach(({ field, answer }) => {
      combinedSheetData.push({ Field: field, Answer: answer });
    });

    // Add an empty row between sections
    combinedSheetData.push({});
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(combinedSheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Combined');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  toast.remove()
 toast.success('Downloaded Successfully')

  saveAs(blob, 'Contract_Result.xlsx');
  }else{
    toast.remove()
    toast.success('Downloaded Successfully')
    saveAs(demoexcel,'Contract_Result')
  }
  
};

  return (
    <Layouts>
      
        <div className="container-fluid position-relative">
          <Row>
            {/* Left Side: File Preview */}
            <Col md="8" className="left-nav">
              <Nav tabs className="pt-2 preview-nav">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                      "text-white": true,
                    })}
                    onClick={() => toggleTab("1")}
                    style={{ cursor: "pointer" }}
                  >
                    Contract - SRM Pharma Contract
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                      "text-white": true,
                    })}
                    onClick={() => toggleTab("2")}
                    style={{ cursor: "pointer" }}
                  >
                    Price- Product Pricing Table
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={activeTab}
                className="bg-white p-4"
                style={{ minHeight: "100vh",overflow:'auto' }}
              >
                <TabPane tabId="1">
                    <iframe src={contractUrl? `${contractUrl}`:contractPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
                <TabPane tabId="2">
                 <iframe src={priceUrl? `${priceUrl}` :pricingPdf} width={'100%'} height={'900px'}></iframe>
                </TabPane>
              </TabContent>
            </Col>

            {/* Right Side: Contract Entities */}
            <Col
              md="4"
              className="d-flex flex-column justify-content-between right-tab"
            >
              <div className="p-3 prev-acc-box">
                <h6 className="text-light mb-3 acc-head">Contract Entities</h6>
                {
                  isLoading ? <>
                    <div className="container my-5 p-0">
            <div className="w-50 m-auto text-center">
              <img src={loadingImg} className="loadingimg" />
              <h5 className="loading-info">
                <i>{loadingStatus[statusIndex]}</i>
              </h5>
            </div>
          </div>
                  </> :  <div className="preview-acc-box">
                 <Accordion
                  open={accordionOpen}
                  toggle={toggleAccordion}
                  flush
                  className="preview-acc"
                >
                  <AccordionItem>
                    <AccordionHeader targetId={1}>
                        Contract Offer
                      </AccordionHeader>
                      <AccordionBody accordionId={1}>
                        <ul className="acc-list-data">
                          {contractOffer.map((data, index) => (
                            <li key={index}>
                              <span className="text-capitalize">{data.field}:</span> {String(data.answer)}
                            </li>
                          ))}
                        </ul>
                      </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId={2}>
                       Product Group
                      </AccordionHeader>
                      <AccordionBody accordionId={2}>
                        <ul className="acc-list-data">
                          {productGroup.map((data, index) => (
                            <li key={index}>
                              <span className="text-capitalize">{data.field}:</span> {String(data.answer)}
                            </li>
                          ))}
                        </ul>
                      </AccordionBody>
                  </AccordionItem>

                  <AccordionItem>
                            <AccordionHeader targetId={3}>
                              Tiered Summary
                            </AccordionHeader>
                      <AccordionBody accordionId={3} className="tiered-body">
                        {tierData?.tier_summary?.map((list, idx) => {
                          return (
                            <ul className="acc-list-data tiered">
                              <li className="hdr">
                                <h6>
                                  Tier Level :{" "}
                                  <span className="cnt">0{idx + 1}</span>{" "}
                                </h6>
                              </li>
                              <li className="hdr">
                                <div className="d-flex justify-content-between text-start">
                                  <div className="ndc-num ndc-bg">
                                    <span className="tier-span">
                                      Purchase Volume Min
                                    </span>
                                    <h5>{list.purchase_volume_min ?? "-"}</h5>
                                  </div>
                                  <div className="wac-price ndc-bg">
                                    <span className="tier-span">
                                      Purchase Volume Max
                                    </span>
                                    <h5 className="">
                                      {list.purchase_volume_max ?? "-"}
                                    </h5>
                                  </div>
                                </div>
                              </li>
                              <li className="split-li-sum">
                                <div className="d-flex justify-content-around">
                                  <div className="ndc-num">
                                    <h5>
                                      <span className="tier-span">
                                        Price Discount (%)
                                      </span>{" "}
                                    </h5>
                                    <h5>
                                      {list.price_discount_percentage}%
                                    </h5>
                                  </div>
                                  <div className="ndc-num">
                                    <h5>
                                      <span className="tier-span">
                                        Admin Fees(%)
                                      </span>{" "}
                                      
                                    </h5>
                                    <h5>{list.administrative_fee_percentage}%</h5>
                                  </div>
                                  <div className="ndc-num">
                                    <h5>
                                      <span className="tier-span">
                                        Rebate(%)
                                      </span>{" "}
                                      
                                    </h5>
                                    <h5>{list.rebate_percentage}%</h5>
                                  </div>
                                </div>
                              </li>
                              {/* <li className="split-li">
                                <div className="d-flex justify-content-between">
                                  <div className="ndc-num">
                                    <h5>
                                      <span className="tier-span">
                                        Administrative Fees Percentage :
                                      </span>{" "}
                                      {list.administrative_fee_percentage}%
                                    </h5>
                                  </div>
                                </div>
                              </li> */}
                              {/* <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $156</h6>
                                </div>
                            </div>
                          </li> */}
                            </ul>
                          );
                        })}
                        {/* <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-1021-30</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$195</h5>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $175.5</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $165.8</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $156</h6>
                                </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-2041-60</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$425</h5>
                                </div>
                            </div>
                          </li>
                        </ul> */}
                      </AccordionBody>
                            
                      
                    </AccordionItem>
                 
                    <AccordionItem>
                            <AccordionHeader targetId={4}>
                              Tiered LI
                            </AccordionHeader>
                      <AccordionBody accordionId={4}>
                        {
                          tier?.products?.map((list)=>{
                            return <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>{list?.ndc_number}</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">{list?.wac_price}</h5>
                                </div>
                            </div>
                          </li>
                          {
                            list?.tiers?.map((tierData)=>{
                                return <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier {tierData?.tier}</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: {tierData?.discount}</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : {tierData?.final_price}</h6>
                                </div>
                            </div>
                          </li>
                            })
                          }
                          {/* <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $175.5</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $165.8</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $156</h6>
                                </div>
                            </div>
                          </li> */}
                        </ul>
                          })
                        }
                        {/* <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-1021-30</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$195</h5>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $175.5</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $165.8</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $156</h6>
                                </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="acc-list-data tiered">
                          <li className="hdr">
                            <div className="d-flex justify-content-between">
                                <div className="ndc-num">
                                    <span>NDC Number</span>
                                    <h5>65483-2041-60</h5>
                                </div>
                                <div className="wac-price">
                                    <span>WAC Price</span>
                                    <h5 className="text-end">$425</h5>
                                </div>
                            </div>
                          </li>
                          {/* <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 1</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 10%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $180</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 2</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 15%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $170</h6>
                                </div>
                            </div>
                          </li>
                          <li className="split-li">
                            <div className="d-flex align-items-center justify-content-between tier-split">
                                <div className="">
                                    <h6>Tier 3</h6>
                                </div>
                                <div className="">
                                    <h6><span>Discount </span>: 20%</h6>
                                </div>
                                <div>
                                    <h6><span>Final Price</span> : $160</h6>
                                </div>
                            </div>
                          </li> */}
                        {/* </ul> */} */
                      </AccordionBody>
                            
                      
                    </AccordionItem>
                </Accordion>
               </div>
                }
              </div>

              {/* Export Buttons */}
             <div className="p-3 d-flex justify-content-evenly  gap-2 export-btn">
                <Button
                  className="exportxl-btn"
                  
                  onClick={()=>exportResultToExcel('Pricing')}
                >
                  <img src={fileImg}/> Export as
                  Excel
                </Button>
                <Button
                  className="exportxl-btn"
                >
                 <img src={fileImg}/> Export as XML
                </Button>
              </div>
            </Col>
          </Row>
        </div>
    </Layouts>
  );
}

export default Preview;
