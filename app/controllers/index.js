var service = new ProductService();
var validation = new Validation();


function getListProduct() {
    service
        .getListProductApi()
        .then(function (result) {
            renderData(result.data);
        })
        .catch(function (error) {
            console.log(error);

        });
}
getListProduct();

function renderData(data) {
    var html = "";
    data.forEach(function (product) {
        html += `
        <tr>
        <td>${product.id}</td>
        <td>${product.taiKhoan}</td>
        <td>${product.matKhau}</td>
        <td>${product.hoTen}</td>
        <td>${product.email}</td>
        <td>${product.ngonNgu}</td>
        <td>${product.loaiND}</td>
        <td>${product.moTa}</td>
        <td class="text-center">
          <img style="max-width: 100px" src="/assets/img/${product.hinhAnh}"/>
        </td>
        <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${product.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        </td>
      </tr>  
`;
    });

    document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}


// delete 
function deleteProduct(id) {
    service
        .deleteProductApi(id)
        .then(function () {
            alert("Delete success");
            getListProduct();
        })
        .catch(function (error) {
            console.log(error);
        });
};

document.getElementById("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add Teacher";
    var footerModal = `<button class ="btn btn-success" onclick="addProduct()">Add Teacher</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;
})

// Add

function addProduct() {
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var ten = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var loaiNN = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("moTa").value;

    service.getListProductApi()
        .then(function (result) {
            // chỉ đc phép thêm nv khi mọi thứ ok
            var isValid = true;

            // Valid
            // mã tk
            isValid &= validation.checkEmpty(taiKhoan, "Mã tài khoản không được để trống", "spanTaiKhoan") && validation.checkID(taiKhoan, "Mã tài khoản không được trùng", "spanTaiKhoan", result.data);

            // tên
            isValid &= validation.checkEmpty(ten, "Họ tên không được để trống", "spanHoTen") && validation.checkName(ten, "Họ tên phải là kiểu chữ", "spanHoTen");

            // pass
            isValid &= validation.checkEmpty(matKhau, "Password không được để trống", "spanMatKhau") && validation.checkPass(matKhau, "Mật khẩu phải đúng định dạng", "spanMatKhau") ;
            // email
            isValid &= validation.checkEmpty(email, "Email không được để trống", "spanEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "spanEmail");

            // hinh anh
            isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống", "spanHinhAnh");

            // mo ta
            isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống", "spanMoTa") &&  validation.checkMoTa(moTa, "Mô tả không được quá 60 ký tự", "spanMoTa");


            if (isValid) {
                var product = new Product("", taiKhoan.trim(), ten.trim(), matKhau.trim(), email.trim(), hinhAnh.trim(), loaiND, loaiNN, moTa.trim());
                service
                    .addProductApi(product)
                    .then(function (result) {
                        // tắt modal 
                        document.getElementsByClassName("close")[0].click();
                        // làm mới data
                        getListProduct();

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
}




// Edit
function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Teacher";
    var footerModal = `<button class ="btn btn-success" onclick="updateProduct(${id})">Update Teacher</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;

    service.getProductbyID(id)
        .then(function (result) {
            //hiển thị ttin product ra ngoài UI
            console.log(result.data);
            document.getElementById("TaiKhoan").value = result.data.taiKhoan;
            document.getElementById("HoTen").value = result.data.hoTen;
            document.getElementById("MatKhau").value = result.data.matKhau;
            document.getElementById("Email").value = result.data.email;
            document.getElementById("HinhAnh").value = result.data.hinhAnh;
            document.getElementById("loaiNguoiDung").value = result.data.loaiND;
            document.getElementById("loaiNgonNgu").value = result.data.loaiNN;
            document.getElementById("moTa").value = result.data.moTa;
        })
        .catch(function (error) {
            console.log(error);
        })
}

// Update

function updateProduct(id) {
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var ten = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var loaiNN = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("moTa").value;

    var product = new Product(id, taiKhoan, ten, matKhau, email, hinhAnh, loaiND, loaiNN, moTa);

    service.updateProductApi(product)
        .then(function (result) {
            // tắt modal 
            document.getElementsByClassName("close")[0].click();
            // làm mới data
            getListProduct();
        })
        .catch(function (error) {
            console.log(error);
        })
}

