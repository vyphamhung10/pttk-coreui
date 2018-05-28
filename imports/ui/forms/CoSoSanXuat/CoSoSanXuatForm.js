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
import CoSoSanXuatController from './Controller'
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";

class CoSoSanXuatForm extends Component {
    componentWillMount = () => {
        Tracker.autorun(() => {
            this.setState({
                danhSachCoSoSanXuat: CoSoSanXuatController.getAllCoSoSanXuat(),
                danhSachLoaiSanPham: CoSoSanXuatController.getAllLoaiSanPham()
            })

        })
    }
    renderDeleteModal = () => {
        if (this.state.currentCoSoSanXuat === null) {
            return
        }

        let toggleDeleteModal = () => {
            this.setState({deleteModalShown: !this.state.deleteModalShown})
        }

        return (<Modal isOpen={this.state.deleteModalShown} toggle={toggleDeleteModal}
                       className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn chắc chắn có muốn xóa tiêu
                chuẩn {this.state.currentCoSoSanXuat.TenCoSoSanXuat}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => {
                    CoSoSanXuatController.deleteCoSoSanXuat(this.state.currentCoSoSanXuat._id);
                    if (this.state.currentCoSoSanXuatIndex === this.state.addedCoSoSanXuatIndex) {
                        this.setState({
                            addedCoSoSanXuatUpdated: true
                        })
                    }
                    this.setState({
                        currentCoSoSanXuat: null,
                        currentCoSoSanXuatIndex: null
                    });

                    toggleDeleteModal()
                }}>Xóa</Button>{' '}
                <Button color="secondary" onClick={() => toggleDeleteModal()}>Hủy</Button>
            </ModalFooter>
        </Modal>)

    }
    toggleChiTieuModal = () => {
        this.setState({chiTieuModalShown: !this.state.chiTieuModalShown})
    }

    renderDanhSachCoSoSanXuat = () => {
        let shownDeleteModal = (index) => {
            this.setState({
                deleteModalShown: !this.state.deleteModalShown,
                currentCoSoSanXuatIndex: index,
                currentCoSoSanXuat: this.state.danhSachCoSoSanXuat[index]
            })
        };
        if (this.state.danhSachCoSoSanXuat && this.state.danhSachCoSoSanXuat.length != 0) {
            return this.state.danhSachCoSoSanXuat.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.TenCoSoSanXuat}</td>
                        <td>{item.ChuCoSo}</td>
                        <td>{item.DiaChi}</td>
                        <td>{item.DanhSachSoDienThoai.map((sodienthoai, sdtindex) => {
                            return <p key={sdtindex}>{sodienthoai}</p>
                        })}
                        </td>
                        <td>{item.DanhSachMaLoaiSanPham.map((maloaisanpham, mlspindex) => {
                            return <p key={mlspindex}>{CoSoSanXuatController.getLoaiSanPham(maloaisanpham).TenLoaiSanPham}</p>})}
                        </td>
                        <td>
                            <Button size="sm" color="primary" className="btn-pill"
                                    onClick={() => this.selectCoSoSanXuat(index)}><span
                                style={{fontSize: "4"}}>Sửa</span></Button>
                            <Button size="sm" color="danger" className="btn-pill"
                                    onClick={() => shownDeleteModal(index)}><span
                                style={{fontSize: "4"}}>Xóa</span></Button>
                        </td>
                    </tr>
                )
            });
        }
        return (<tr>
            Không có tiêu chuẩn.
        </tr>)
    }
    renderDanhSachLoaiSanPham = () => {
        if (this.state.danhSachLoaiSanPham) {
            return this.state.danhSachLoaiSanPham.map((item, index) => {
                return (<option value={item._id} key={item._id}>{item.TenLoaiSanPham}</option>)
            });
        }
    }
    renderCoSoSanXuat = () => {
        if (this.state.currentCoSoSanXuat === null) {
            return (
                <Card>
                    <CardHeader>
                        <strong>Chi tiết cơ sản xuất</strong>
                    </CardHeader>
                    <CardBody>
                        <strong>Chưa có cơ sở sản xuất được chọn</strong>
                    </CardBody>
                </Card>
            )
        }
        let TieuChuan = this.state.currentCoSoSanXuat;
        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết cơ sản xuất</strong>
                </CardHeader>
                <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"
                          onSubmit={this.updateCoSoSanXuat}
                          onReset={this.resetCurrentCoSoSanXuat}>
                        <FormGroup row>
                            <Col md="3">
                                <Label>ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <p id="txtMaCoSoSanXuat" className="form-control-static"></p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Tên cơ sỏ sản xuất</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtTenCoSanXuat" name="text-input" placeholder="Text"
                                       defaultValue={TieuChuan.TenTieuChuan}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Chủ cơ sở</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtChuCoSo" name="text-input" placeholder="Text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Địa chỉ</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtDiaChi" name="text-input" placeholder="Text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Số điện thoại</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="txtSoDienThoai" name="text-input" placeholder="Text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="select">Loại sản phẩm</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="multiple" name="select" id="cbMaLoaiSanPham">
                                    {this.renderDanhSachLoaiSanPham()}
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

    selectCoSoSanXuat = (index) => {
        let currentCoSoSanXuat = this.state.danhSachCoSoSanXuat[index];
        this.setState({
            currentCoSoSanXuatIndex: index,
            currentCoSoSanXuat: currentCoSoSanXuat
        });
        console.log(`Co so san xuat thu ${index} da duoc chon`);
        $("#txtTenCoSoSanXuat").val(currentCoSoSanXuat.TenCoSoSanXuat);
        $("#txtChuCoSo").val(currentCoSoSanXuat.ChuCoSo);
        $("#txtDiaChi").val(currentCoSoSanXuat.DiaChi);
        $("#txtSoDienThoai").val(currentCoSoSanXuat.DanhSachSoDienThoai[0]);
    };
    addCoSoSanXuat = () => {
        //Thêm mới mà chưa cập nhật thì ko cho thêm
        if (this.state.addedCoSoSanXuatUpdated === false) {
            this.notify("Bạn chưa cập nhật cơ sở sản xuất mới thêm", "warning");
            return;
        }
        this.setState({
            addedCoSoSanXuatUpdated: false,
            addedCoSoSanXuatIndex: this.state.danhSachCoSoSanXuat.length
        });
        console.log(CoSoSanXuatController.addCoSoSanXuat(this.dummyCoSoSanXuat));
    }
    notify = (message, type) => {
        this.refs.notify.notificationAlert({
            place: 'br',
            message: message,
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 4
        })
    }

    updateCoSoSanXuat = (e) => {
        e.preventDefault();
        this.state.currentCoSoSanXuat.TenCoSoSanXuat = e.target.txtTenCoSoSanXuat.value;
        this.state.currentCoSoSanXuat.ChuCoSo = e.target.txtChuCoSo.value;
        this.state.currentCoSoSanXuat.DiaChi = e.target.txtDiaChi.value;
        this.state.currentCoSoSanXuat.SoDienThoai = [e.target.txtSoDienThoai.value];
        if (this.state.addedCoSoSanXuatIndex === this.state.currentCoSoSanXuatIndex) {
            this.setState({
                addedCoSoSanXuatUpdated: true
            });
        }
        DangKySanPhamController.upsertTieuChuan(this.state.currentCoSoSanXuat);
        this.notify("Cập nhật thành công", "success");
    };
    resetCurrentCoSoSanXuat = () => {
        this.selectCoSoSanXuat(this.state.currentCoSoSanXuatIndex);
    };

    constructor(props) {
        super(props);

        this.dummyCoSoSanXuat = {
            TenCoSoSanXuat: "Cơ sở sản xuất",
            ChuCoSo: "Nguyen Van A",
            DiaChi: "24 Pham Van Dong",
            DanhSachSoDienThoai: ["1212312", "23432312321"],
            DanhSachMaLoaiSanPham: ["CH", "CV"],
            Delete: false
        };


        this.state = {
            addedCoSoSanXuatIndex: null,
            addedCoSoSanXuatUpdated: true,
            deleteModalShown: false,
            currentCoSoSanXuatIndex: null,
            currentCoSoSanXuat: null,
            danhSachCoSoSanXuat: null,
            danhSachLoaiSanPham: null,
        };
    }

    render() {
        return (
            <div className="animated fadeIn">
                <NotificationAlert ref="notify"/>
                {this.renderDeleteModal()}
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Danh sách cơ sở sản xuất
                                <div className="card-header-actions">
                                    <Button size="sm" color="success" className="btn-pill"
                                            onClick={() => this.addCoSoSanXuat()}><span
                                        style={{fontSize: "4"}}>Thêm</span></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Chủ cơ sở</th>
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Loại sản phẩm đăng ký</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderDanhSachCoSoSanXuat()}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col ls="2">
                        {this.renderCoSoSanXuat()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CoSoSanXuatForm;