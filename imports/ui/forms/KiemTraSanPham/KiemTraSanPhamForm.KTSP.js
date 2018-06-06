import React, {Component} from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Label,
    Input,
    Form,
    FormText,
    CardFooter,
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap';
import {Tracker} from 'meteor/tracker'
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";

class KiemTraSanPhamForm extends Component {
    constructor(props) {
        super(props);
    }

  

  
    

    renderDangKySanPham = () => {

        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết kiểm tra sản phảm</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label>ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <p id="txtMaDangKySanPham" className="form-control-static"></p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Cơ sở sản xuất</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbMaCoSoSanXuat">
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="cbSanPham">
                                </Input>
                            </Col>
                        </FormGroup>
 
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày kiểm tra </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayDangKy" name="date-input" defaultValue={moment().format("YYYY-MM-DD")}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Tiêu chuẩn đăng ký</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" name="select" id="cbMaTieuChuan" disable>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Card>
                                <CardHeader>
                                    Danh sách chỉ tiêu
                                </CardHeader>
                                <CardBody>
                                    <Table hover bordered striped responsive size="sm" id="tbDanhSachChiTieu">
                                        <thead>
                                        <tr>
                                            <th>Tên chỉ tiêu</th>
                                            <th>Phân loại</th>
                                            <th>Giá trị</th>
                                            <th>Đơn vị</th>
                                            <th>Ghi chú</th>
                                            <th>Kết quả kiểm tra</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                         <tr>
                                            <td>Hàm lượt sắt</td>
                                            <td>Vượt quá</td>
                                            <td>>= 100</td>
                                            <td>mg/kg</td>
                                            <th></th>
                                            <td><Input type="number" name="select" id="cbMaCoSoSanXuat"/></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Kết quả kiểm tra</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" name="select" id="cbMaTieuChuan" disable>
                                </Input>
                            </Col>
                        </FormGroup>
                        <Button type="submit" size="sm" color="primary"><i
                            className="fa fa-dot-circle-o"></i> Cập nhật</Button>
                        <Button type="reset" size="sm" color="danger"><i
                            className="fa fa-ban"></i>Đặt lại</Button>
                    </Form>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>)
    }

    

    render() {
        return (
            <div className="animated fadeIn">
                <NotificationAlert ref="notify" />
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách kiểm tra sản phẩm
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"
                                            onClick={() => this.addDangKySanPham()}><span
                                        style={{fontSize: "4"}}>Thêm</span></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Cơ sở sản xuất</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Ngày kiểm tra</th>
                                        <th>Kết quả</th>
                                        <th>Nhân viên kiểm tra</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Cơ sở Nguyễn Văn A</td>
                                        <td>Cá đóng hộp Basasa 100g</td>
                                        <td>3/3/2018</td>
                                        <td>Đạt</td>
                                        <td>Trần Văn Minh</td>
                                        <td>  <Button size="sm" color="primary" className="btn-pill"
                                   ><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                                    ><span
                                style={{fontSize: "4"}}>Xóa</span></Button></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col ls="2">
                        {this.renderDangKySanPham()}
                    </Col>
                </Row>
            </div>
        );
    }

   

    notify = (message = "message", type = "success") => {
        this.refs.notify.notificationAlert({
            place: 'br',
            message: message,
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 4
        })
    };

}

export default KiemTraSanPhamForm;