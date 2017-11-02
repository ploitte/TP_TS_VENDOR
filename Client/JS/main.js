System.register("class/Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("class/Categorie", ["class/Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Categorie;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Categorie = class Categorie extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                display(where) {
                    let div = "<div class='catCont' id='" + this.name + "' data-id='" + this.id + "'>" + this.name + "</div>";
                    this.$dom = $(div);
                    where.append(this.$dom);
                }
            };
            exports_2("Categorie", Categorie);
        }
    };
});
System.register("class/Produit", ["class/Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Produit;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Produit = class Produit extends Model_2.Model {
                constructor(id, name, catId, desc) {
                    super(id);
                    this.name = name;
                    this.catId = catId;
                    this.desc = desc;
                }
                display(where) {
                    let div = "<div id='" + this.name + "' class='item'></div>";
                    this.$dom = $(div);
                    where.append(this.$dom);
                }
                displayDesc(where) {
                    let div = "<div id='haut'>";
                    div += "<div id='" + this.name + "' class='descItem'></div>";
                    div += "<div class='prodName'>" + this.name + "</div>";
                    div += "</div>";
                    div += "<div id='bas'>";
                    div += "<div id='basTxt'>" + this.desc + "</div>";
                    div += "</div>";
                    // this.$domDesc = $(div);
                    this.test = div;
                    where.html(this.test);
                }
            };
            exports_3("Produit", Produit);
        }
    };
});
System.register("class/Vendeur", ["class/Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_3, Vendeur;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendeur = class Vendeur extends Model_3.Model {
                constructor(id, name, produits) {
                    super(id);
                    this.name = name;
                    this.produits = produits;
                }
                display(where) {
                    let name = this.name;
                    let id = "vendeur" + this.id;
                    let div = "<div class='vendeurVignette' id='" + id + "' data-id='" + this.id + "'>" + name + "</div>";
                    this.$dom = $(div);
                    where.prepend(this.$dom);
                }
            };
            exports_4("Vendeur", Vendeur);
        }
    };
});
System.register("class/ApiService", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var ApiService;
    return {
        setters: [],
        execute: function () {
            ApiService = class ApiService {
                constructor() {
                    this.url = "http://localhost/tsDragVendeur/Serveur/api/";
                }
                static getService() {
                    if (!ApiService.instance) {
                        ApiService.instance = new ApiService();
                    }
                    return ApiService.instance;
                }
                getConnexion(username, password) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "connexion",
                            method: "post",
                            dataType: "json",
                            data: {
                                username: username,
                                password: password
                            },
                            success: (connex) => {
                                resolve(connex);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getInscription(username, email, password, verifPass) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "inscription",
                            method: "post",
                            dataType: "json",
                            data: {
                                username: username,
                                email: email,
                                password: password,
                                verifPass: verifPass
                            },
                            success: (inscription) => {
                                resolve(inscription);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getVendeur(idvendeur) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "vendeur/" + idvendeur,
                            dataType: "json",
                            success: (vendeur) => {
                                resolve(vendeur);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getCategorie() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "categorie",
                            method: "get",
                            dataType: "json",
                            success: (cat) => {
                                resolve(cat);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
            };
            ApiService.instance = null;
            exports_5("ApiService", ApiService);
        }
    };
});
System.register("class/App", ["class/Vendeur", "class/Produit", "class/Categorie", "class/ApiService"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Vendeur_1, Produit_1, Categorie_1, ApiService_1, App;
    return {
        setters: [
            function (Vendeur_1_1) {
                Vendeur_1 = Vendeur_1_1;
            },
            function (Produit_1_1) {
                Produit_1 = Produit_1_1;
            },
            function (Categorie_1_1) {
                Categorie_1 = Categorie_1_1;
            },
            function (ApiService_1_1) {
                ApiService_1 = ApiService_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.stopLock = false;
                    this.stopLockProd = false;
                    this.stopLockDesc = false;
                    this.stopLockCo = false;
                    this.mooveBody = 0;
                    this.currentVendeur = null;
                    this.currentCat = [];
                    this.currentProduit = [];
                    this.flagAnim = false;
                    this.idVendeur = 0;
                    this.king = $("#theKING");
                    this.nameVendeur = $("#vendeur");
                    this.item = $(".item");
                    this.header = $("header");
                }
                //TEST CONSOLE//
                testLog() {
                    // console.log(this.currentProduit);
                }
                //_____________
                stopPropa(callback) {
                    let that = this;
                    if (this.stopLock == false) {
                        callback();
                        this.stopLock = true;
                        setTimeout(function () {
                            that.stopLock = false;
                        }, 1000);
                    }
                    else {
                        return;
                    }
                }
                stopPropaProd(id) {
                    let that = this;
                    if (this.stopLockProd == false) {
                        for (let a of this.currentProduit) {
                            if (id == a["catId"]) {
                                a.display($("#prodMain"));
                            }
                        }
                        this.stopLockProd = true;
                        setTimeout(function () {
                            that.stopLockProd = false;
                        }, 600);
                    }
                    else {
                        return;
                    }
                }
                stopPropaDesc(id) {
                    let that = this;
                    if (this.stopLockDesc == false) {
                        for (let a of this.currentProduit) {
                            if (id == a["name"]) {
                                a.displayDesc($("#detailMain"));
                                console.log(a);
                            }
                        }
                        this.stopLockDesc = true;
                        setTimeout(function () {
                            that.stopLockDesc = false;
                        }, 600);
                    }
                    else {
                        return;
                    }
                }
                stopPropaCo(name, password) {
                    let that = this;
                    if (this.stopLockCo == false) {
                        this.getConnexion(name, password);
                        this.stopLockCo = true;
                        setTimeout(function () {
                            that.stopLockCo = false;
                        }, 1000);
                    }
                    else {
                        return;
                    }
                }
                resetDom() {
                    $(":text, :password").val("");
                    for (let a of this.currentCat) {
                        a.$dom.remove();
                    }
                    for (let a of this.currentCat) {
                        a.$dom.remove();
                    }
                    this.currentCat = [];
                    this.currentProduit = [];
                    this.currentVendeur = null;
                }
                resetPos() {
                    this.mooveBody = 0;
                    this.king.css("right", this.mooveBody + "%");
                }
                up() {
                    this.mooveBody += 100;
                    this.king.css("right", this.mooveBody + "%");
                }
                down() {
                    this.mooveBody -= 100;
                    this.king.css("right", this.mooveBody + "%");
                }
                getSuccess(data) {
                    $("#error").html("");
                    $("#co").removeClass("removeError");
                    if (data.error == "good") {
                        this.up();
                        $("#connected").append("<h3 id='successCo'> Welcome " + data.success["name"] + "</h3>");
                        setTimeout(function () {
                            $("#connected").css("top", "5%");
                        }, 500);
                        setTimeout(function () {
                            $("#connected").css("opacity", "0");
                        }, 3500);
                        this.getVendeur(data.success["id"]);
                    }
                }
                getError(data) {
                    let div = "";
                    for (let a in data.error) {
                        div += "<h3 class='spanError'>-  " + data.error[a] + "</h3>";
                    }
                    $("#error").css("display", "block");
                    $("#co").addClass("removeError");
                    $("#error").html(div);
                }
                getConnexion(name, password) {
                    let api = ApiService_1.ApiService.getService();
                    let connec = api.getConnexion(name, password);
                    connec.then((data) => {
                        if (data.error == "good") {
                            this.getSuccess(data);
                        }
                        else {
                            this.getError(data);
                        }
                    })
                        .catch((error) => {
                        (error);
                    });
                }
                getVendeur($id) {
                    let api = ApiService_1.ApiService.getService();
                    let vend = api.getVendeur($id);
                    vend.then((data) => {
                        for (let a of data.catVendeur) {
                            let newCat = new Categorie_1.Categorie(a["id"], a["name"]);
                            this.currentCat.push(newCat);
                            newCat.display($("#catMain"));
                            if (this.currentCat.length == 3) {
                                $(".catCont").css("height", "33%");
                            }
                            if (this.currentCat.length == 2) {
                                $(".catCont").css("height", "50%");
                            }
                            if (this.currentCat.length == 1) {
                                $(".catCont").css("height", "60%");
                            }
                        }
                        for (let b of data.produitVendeur) {
                            let newProd = new Produit_1.Produit(b["id"], b["name"], b["id_cat"], b["details"]);
                            this.currentProduit.push(newProd);
                        }
                        let newVendor = new Vendeur_1.Vendeur(data.vendeur["id"], data.vendeur["name"], this.currentProduit);
                        this.testLog();
                        this.currentVendeur = newVendor;
                    })
                        .catch((error) => {
                        (error);
                    });
                }
                removeHtml(where) {
                    let test = $("#" + where).parent();
                    test.children().html("");
                }
            };
            exports_6("App", App);
        }
    };
});
System.register("main", ["class/App"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            $(document).click(function () {
                //TEST
            });
            $(document).on("click", "#exit", function () {
                app.resetPos();
                setTimeout(function () {
                    app.resetDom();
                }, 600);
            });
            $(document).on("click", ".back", function () {
                let where = $(this).attr("id");
                app.down();
                setTimeout(function () {
                    app.removeHtml(where);
                }, 300);
            });
            $("#subReg").click(function (event) {
                event.preventDefault();
                $("#warning, #alertMessage").css("display", "block");
            });
            $(document).on("click", "#subCo", function (event) {
                event.preventDefault();
                let name = $("#usernameCo").val();
                let password = $("#passCo").val();
                app.stopPropaCo(name, password);
            });
            $(document).on("click", ".catCont", function () {
                app.stopPropa($.proxy(app.up, app));
                let data = $(this).data("id");
                app.stopPropaProd(data);
            });
            $(document).on("click", ".item", function () {
                app.up();
                let id = $(this).attr("id");
                app.stopPropaDesc(id);
            });
        }
    };
});
//Permet d'afficher les error en cas de faute de frappe dans le $("...");
function Dom(selector) {
    let elementJquery = $(selector);
    if (elementJquery.length < 1) {
        throw new Error("L'élelement " + selector + "n'existe pas dans votre html !");
    }
    return elementJquery;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL2NsYXNzL01vZGVsLnRzIiwiVFMvY2xhc3MvQ2F0ZWdvcmllLnRzIiwiVFMvY2xhc3MvUHJvZHVpdC50cyIsIlRTL2NsYXNzL1ZlbmRldXIudHMiLCJUUy9jbGFzcy9BcGlTZXJ2aWNlLnRzIiwiVFMvY2xhc3MvQXBwLnRzIiwiVFMvbWFpbi50cyIsIlRTL2RlYnVnL0RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsUUFBQTtnQkFLSSxZQUFZLEVBQVM7b0JBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEtBQUs7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7YUFJSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDYkYsWUFBQSxlQUF1QixTQUFRLGFBQUs7Z0JBS2hDLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxPQUFPLENBQUMsS0FBWTtvQkFDaEIsSUFBSSxHQUFHLEdBQVUsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLEdBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7b0JBRTlHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUVKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUNoQkYsVUFBQSxhQUFxQixTQUFRLGFBQUs7Z0JBUTlCLFlBQVksRUFBUyxFQUFFLElBQVcsRUFBRSxLQUFZLEVBQUUsSUFBVztvQkFDekQsS0FBSyxD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LENBQUM7QUFDekIsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVse1xyXG5cclxuICAgIHB1YmxpYyBpZDpudW1iZXI7XHJcbiAgICBwdWJsaWMgJGRvbTogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGRpc3BsYXkod2hlcmU6SlF1ZXJ5KTp2b2lkO1xyXG5cclxufSIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWUgZXh0ZW5kcyBNb2RlbCB7XHJcblxyXG4gICAgcHVibGljICRkb206IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7IFxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkod2hlcmU6SlF1ZXJ5KXtcclxuICAgICAgICBsZXQgZGl2OnN0cmluZyA9IFwiPGRpdiBjbGFzcz0nY2F0Q29udCcgaWQ9J1wiICsgdGhpcy5uYW1lICsgXCInIGRhdGEtaWQ9J1wiKyB0aGlzLmlkICtcIic+XCIrIHRoaXMubmFtZSArIFwiPC9kaXY+XCI7XHJcblxyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoZGl2KTtcclxuICAgICAgICB3aGVyZS5hcHBlbmQodGhpcy4kZG9tKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDYXRlZ29yaWUgfSBmcm9tIFwiLi9DYXRlZ29yaWVcIjtcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2R1aXQgZXh0ZW5kcyBNb2RlbHtcclxuXHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgY2F0SWQ6bnVtYmVyO1xyXG4gICAgcHVibGljIGRlc2M6c3RyaW5nO1xyXG4gICAgcHVibGljICRkb21EZXNjOkpRdWVyeTtcclxuICAgIHB1YmxpYyB0ZXN0OnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nLCBjYXRJZDpudW1iZXIsIGRlc2M6c3RyaW5nKXtcclxuICAgICAgICBzdXBlcihpZCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNhdElkID0gY2F0SWQ7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzYztcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KHdoZXJlOkpRdWVyeSl7ICAgICAgIFxyXG4gICAgICAgIGxldCBkaXY6c3RyaW5nID0gXCI8ZGl2IGlkPSdcIisgdGhpcy5uYW1lICtcIicgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiO1xyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoZGl2KTtcclxuICAgICAgICB3aGVyZS5hcHBlbmQodGhpcy4kZG9tKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5RGVzYyh3aGVyZTpKUXVlcnkpe1xyXG4gICAgICAgIGxldCBkaXY6c3RyaW5nID0gXCI8ZGl2IGlkPSdoYXV0Jz5cIlxyXG4gICAgICAgIGRpdiArPSBcIjxkaXYgaWQ9J1wiKyB0aGlzLm5hbWUgK1wiJyBjbGFzcz0nZGVzY0l0ZW0nPjwvZGl2PlwiO1xyXG4gICAgICAgIGRpdiArPSBcIjxkaXYgY2xhc3M9J3Byb2ROYW1lJz5cIiArIHRoaXMubmFtZSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgZGl2ICs9IFwiPC9kaXY+XCJcclxuICAgICAgICBkaXYgKz0gXCI8ZGl2IGlkPSdiYXMnPlwiO1xyXG4gICAgICAgIGRpdiArPSBcIjxkaXYgaWQ9J2Jhc1R4dCc+XCIgKyB0aGlzLmRlc2MgKyBcIjwvZGl2PlwiO1xyXG4gICAgICAgIGRpdiArPSBcIjwvZGl2PlwiXHJcblxyXG4gICAgICAgIC8vIHRoaXMuJGRvbURlc2MgPSAkKGRpdik7XHJcbiAgICAgICAgdGhpcy50ZXN0ID0gZGl2O1xyXG4gICAgICAgIHdoZXJlLmh0bWwodGhpcy50ZXN0KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWl0IH0gZnJvbSBcIi4vUHJvZHVpdFwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVuZGV1ciBleHRlbmRzIE1vZGVse1xyXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xyXG4gICAgcHVibGljIHByb2R1aXRzOlByb2R1aXRbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgcHJvZHVpdHM6UHJvZHVpdFtdKXtcclxuICAgICAgICBzdXBlcihpZCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb2R1aXRzID0gcHJvZHVpdHM7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgZGlzcGxheSh3aGVyZTpKUXVlcnkpe1xyXG4gICAgICAgIGxldCBuYW1lOnN0cmluZyA9IHRoaXMubmFtZTtcclxuICAgICAgICBsZXQgaWQ6c3RyaW5nID0gXCJ2ZW5kZXVyXCIgKyB0aGlzLmlkO1xyXG5cclxuICAgICAgICBsZXQgZGl2OnN0cmluZyA9IFwiPGRpdiBjbGFzcz0ndmVuZGV1clZpZ25ldHRlJyBpZD0nXCIrIGlkICtcIicgZGF0YS1pZD0nXCIrIHRoaXMuaWQgK1wiJz5cIiArIG5hbWUgKyBcIjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB0aGlzLiRkb20gPSAkKGRpdik7XHJcbiAgICAgICAgd2hlcmUucHJlcGVuZCh0aGlzLiRkb20pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgXHJcbn0iLCJleHBvcnQgY2xhc3MgQXBpU2VydmljZXtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQXBpU2VydmljZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHVybDpzdHJpbmcgPSBcImh0dHA6Ly9sb2NhbGhvc3QvdHNEcmFnVmVuZGV1ci9TZXJ2ZXVyL2FwaS9cIjtcclxuXHJcbiAgICBzdGF0aWMgZ2V0U2VydmljZSgpOkFwaVNlcnZpY2V7XHJcbiAgICAgICAgaWYoICFBcGlTZXJ2aWNlLmluc3RhbmNlKXtcclxuICAgICAgICAgICAgQXBpU2VydmljZS5pbnN0YW5jZSA9IG5ldyBBcGlTZXJ2aWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcGlTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcblxyXG4gICAgZ2V0Q29ubmV4aW9uKHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKSA6UHJvbWlzZTx7IGlkOiBudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nLCBlbWFpbDpzdHJpbmcgfT57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsIDogdGhpcy51cmwgKyBcImNvbm5leGlvblwiLCAgIFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kIDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZSA6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZSA6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkIDogcGFzc3dvcmRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogKGNvbm5leCA6IHsgaWQ6IG51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcsIGVtYWlsOnN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb25uZXgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yIDogKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5zY3JpcHRpb24odXNlcm5hbWU6c3RyaW5nLCBlbWFpbDpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZywgdmVyaWZQYXNzOnN0cmluZykgOlByb21pc2U8eyBzdGF0dXM6IHN0cmluZywgZXJyb3I6IHN0cmluZ1tdIH0+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiB0aGlzLnVybCArIFwiaW5zY3JpcHRpb25cIixcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUgOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbCA6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkIDogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZQYXNzIDogdmVyaWZQYXNzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA6IChpbnNjcmlwdGlvbjogeyBzdGF0dXM6IHN0cmluZywgZXJyb3I6IHN0cmluZ1tdIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGluc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRWZW5kZXVyKCBpZHZlbmRldXI6bnVtYmVyICk6IFByb21pc2U8IHsgdmVuZGV1cjogYW55LCBwcm9kdWl0VmVuZGV1cjogYW55LCBjYXRWZW5kZXVyOiBhbnkgfSA+IHtcclxuIFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiB0aGlzLnVybCArIFwidmVuZGV1ci9cIiArIGlkdmVuZGV1cixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiAodmVuZGV1cjogeyB2ZW5kZXVyOiBhbnksIHByb2R1aXRWZW5kZXVyOiBhbnksIGNhdFZlbmRldXI6IGFueSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2ZW5kZXVyKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA6IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3JpZSgpIDpQcm9taXNlIDx7aWQ6bnVtYmVyLCBuYW1lOnN0cmluZ30+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PntcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybCA6IHRoaXMudXJsICsgXCJjYXRlZ29yaWVcIixcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA6IFwiZ2V0XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZSA6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA6IChjYXQ6IHtpZDpudW1iZXIsIG5hbWU6c3RyaW5nfSkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYXQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yIDogKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICAgXHJcbn0iLCJpbXBvcnQgeyBWZW5kZXVyIH0gZnJvbSAnLi9WZW5kZXVyJztcclxuaW1wb3J0IHsgUHJvZHVpdCB9IGZyb20gXCIuL1Byb2R1aXRcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcmllIH0gZnJvbSBcIi4vQ2F0ZWdvcmllXCI7XHJcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gXCIuL0FwaVNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcHVibGljIHN0b3BMb2NrOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdG9wTG9ja1Byb2Q6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0b3BMb2NrRGVzYzpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RvcExvY2tDbzpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbW9vdmVCb2R5Om51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY3VycmVudFZlbmRldXI6VmVuZGV1ciA9IG51bGw7XHJcbiAgICBwdWJsaWMgY3VycmVudENhdDpDYXRlZ29yaWVbXSA9IFtdO1xyXG4gICAgcHVibGljIGN1cnJlbnRQcm9kdWl0OlByb2R1aXRbXSA9IFtdO1xyXG4gICAgcHVibGljIGZsYWdBbmltOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpZFZlbmRldXI6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbmFtZVZlbmRldXI6IEpRdWVyeTtcclxuICAgIHB1YmxpYyBpdGVtOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgaGVhZGVyOkpRdWVyeTtcclxuICAgIHB1YmxpYyBraW5nOkpRdWVyeTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMua2luZyA9ICQoXCIjdGhlS0lOR1wiKTtcclxuICAgICAgICB0aGlzLm5hbWVWZW5kZXVyID0gJChcIiN2ZW5kZXVyXCIpO1xyXG4gICAgICAgIHRoaXMuaXRlbSA9ICQoXCIuaXRlbVwiKTtcclxuICAgICAgICB0aGlzLmhlYWRlciA9ICQoXCJoZWFkZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9URVNUIENPTlNPTEUvL1xyXG4gICAgdGVzdExvZygpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFByb2R1aXQpO1xyXG4gICAgfVxyXG4gICAgLy9fX19fX19fX19fX19fXHJcblxyXG5cclxuICAgIHN0b3BQcm9wYShjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IHRoYXQ6YW55ID0gdGhpcztcclxuICAgICAgICBpZih0aGlzLnN0b3BMb2NrID09IGZhbHNlKXtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wTG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3RvcExvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wUHJvcGFQcm9kKGlkOm51bWJlcil7XHJcbiAgICAgICAgbGV0IHRoYXQ6YW55ID0gdGhpcztcclxuICAgICAgICBpZih0aGlzLnN0b3BMb2NrUHJvZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgYSBvZiB0aGlzLmN1cnJlbnRQcm9kdWl0KXtcclxuICAgICAgICAgICAgaWYoaWQgPT0gYVtcImNhdElkXCJdKXtcclxuICAgICAgICAgICAgICAgIGEuZGlzcGxheSgkKFwiI3Byb2RNYWluXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdG9wTG9ja1Byb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnN0b3BMb2NrUHJvZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LDYwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFByb3BhRGVzYyhpZDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0aGF0OmFueSA9IHRoaXM7XHJcbiAgICAgICAgaWYodGhpcy5zdG9wTG9ja0Rlc2MgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBmb3IobGV0IGEgb2YgdGhpcy5jdXJyZW50UHJvZHVpdCl7XHJcbiAgICAgICAgICAgIGlmKGlkID09IGFbXCJuYW1lXCJdKXtcclxuICAgICAgICAgICAgICAgIGEuZGlzcGxheURlc2MoJChcIiNkZXRhaWxNYWluXCIpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0b3BMb2NrRGVzYyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3RvcExvY2tEZXNjID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sNjAwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wUHJvcGFDbyhuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKXtcclxuICAgICAgICBsZXQgdGhhdDphbnkgPSB0aGlzO1xyXG4gICAgICAgIGlmKHRoaXMuc3RvcExvY2tDbyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29ubmV4aW9uKG5hbWUsIHBhc3N3b3JkKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wTG9ja0NvID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zdG9wTG9ja0NvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sMTAwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0RG9tKCl7XHJcbiAgICAgICAgJChcIjp0ZXh0LCA6cGFzc3dvcmRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIGZvcihsZXQgYSBvZiB0aGlzLmN1cnJlbnRDYXQpe1xyXG4gICAgICAgICAgICBhLiRkb20ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgYSBvZiB0aGlzLmN1cnJlbnRDYXQpe1xyXG4gICAgICAgICAgICBhLiRkb20ucmVtb3ZlKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLmN1cnJlbnRDYXQgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9kdWl0ID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmVuZGV1ciA9IG51bGw7ICAgXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXNldFBvcygpe1xyXG4gICAgICAgIHRoaXMubW9vdmVCb2R5ID0gMDtcclxuICAgICAgICB0aGlzLmtpbmcuY3NzKFwicmlnaHRcIiwgdGhpcy5tb292ZUJvZHkrXCIlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwKCl7XHJcbiAgICAgICAgdGhpcy5tb292ZUJvZHkgKz0gMTAwO1xyXG4gICAgICAgIHRoaXMua2luZy5jc3MoXCJyaWdodFwiLCB0aGlzLm1vb3ZlQm9keStcIiVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZG93bigpe1xyXG4gICAgICAgIHRoaXMubW9vdmVCb2R5IC09IDEwMDtcclxuICAgICAgICB0aGlzLmtpbmcuY3NzKFwicmlnaHRcIiwgdGhpcy5tb292ZUJvZHkrXCIlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN1Y2Nlc3MoZGF0YTphbnkpe1xyXG4gICAgICAgICQoXCIjZXJyb3JcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAkKFwiI2NvXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlRXJyb3JcIik7XHJcbiAgICAgICAgaWYoZGF0YS5lcnJvciA9PSBcImdvb2RcIil7XHJcbiAgICAgICAgICAgIHRoaXMudXAoKTtcclxuICAgICAgICAgICAgJChcIiNjb25uZWN0ZWRcIikuYXBwZW5kKFwiPGgzIGlkPSdzdWNjZXNzQ28nPiBXZWxjb21lIFwiICsgZGF0YS5zdWNjZXNzW1wibmFtZVwiXSArIFwiPC9oMz5cIik7ICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Nvbm5lY3RlZFwiKS5jc3MoXCJ0b3BcIiwgXCI1JVwiKTtcclxuICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Nvbm5lY3RlZFwiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgfSwgMzUwMClcclxuICAgICAgICAgICAgdGhpcy5nZXRWZW5kZXVyKGRhdGEuc3VjY2Vzc1tcImlkXCJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXJyb3IoZGF0YTphbnkpe1xyXG4gICAgICAgIGxldCBkaXY6c3RyaW5nID0gXCJcIjsgICBcclxuICAgICAgICBmb3IobGV0IGEgaW4gZGF0YS5lcnJvcil7XHJcbiAgICAgICAgICAgIGRpdiArPSBcIjxoMyBjbGFzcz0nc3BhbkVycm9yJz4tICBcIiArIGRhdGEuZXJyb3JbYV0gKyBcIjwvaDM+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjZXJyb3JcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICQoXCIjY29cIikuYWRkQ2xhc3MoXCJyZW1vdmVFcnJvclwiKTtcclxuICAgICAgICAkKFwiI2Vycm9yXCIpLmh0bWwoZGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25uZXhpb24obmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZyk6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IGFwaTpBcGlTZXJ2aWNlID0gQXBpU2VydmljZS5nZXRTZXJ2aWNlKCk7IFxyXG4gICAgICAgIGxldCBjb25uZWM6UHJvbWlzZTxhbnk+ID0gYXBpLmdldENvbm5leGlvbihuYW1lLCBwYXNzd29yZCk7XHJcblxyXG4gICAgICAgIGNvbm5lYy50aGVuKCggZGF0YSApID0+IHtcclxuICAgICAgICAgICAgaWYoZGF0YS5lcnJvciA9PSBcImdvb2RcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RXJyb3IoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+e1xyXG4gICAgICAgICAgICAoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZlbmRldXIoJGlkOm51bWJlcik6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IGFwaTpBcGlTZXJ2aWNlID0gQXBpU2VydmljZS5nZXRTZXJ2aWNlKCk7IFxyXG4gICAgICAgIGxldCB2ZW5kOlByb21pc2U8YW55PiA9IGFwaS5nZXRWZW5kZXVyKCRpZCk7ICAgIFxyXG5cclxuICAgICAgICB2ZW5kLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZm9yKGxldCBhIG9mIGRhdGEuY2F0VmVuZGV1cil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2F0OkNhdGVnb3JpZSA9IG5ldyBDYXRlZ29yaWUoYVtcImlkXCJdLCBhW1wibmFtZVwiXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXQucHVzaChuZXdDYXQpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2F0LmRpc3BsYXkoJChcIiNjYXRNYWluXCIpKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENhdC5sZW5ndGggPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jYXRDb250XCIpLmNzcyhcImhlaWdodFwiLCBcIjMzJVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENhdC5sZW5ndGggPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jYXRDb250XCIpLmNzcyhcImhlaWdodFwiLCBcIjUwJVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENhdC5sZW5ndGggPT0gMSl7IFxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY2F0Q29udFwiKS5jc3MoXCJoZWlnaHRcIiwgXCI2MCVcIik7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGIgb2YgZGF0YS5wcm9kdWl0VmVuZGV1cil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UHJvZDpQcm9kdWl0ID0gbmV3IFByb2R1aXQoYltcImlkXCJdLCBiW1wibmFtZVwiXSwgYltcImlkX2NhdFwiXSwgYltcImRldGFpbHNcIl0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZHVpdC5wdXNoKG5ld1Byb2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmVuZG9yOlZlbmRldXIgPSBuZXcgVmVuZGV1cihcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnZlbmRldXJbXCJpZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnZlbmRldXJbXCJuYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2R1aXRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RMb2coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZlbmRldXIgPSBuZXdWZW5kb3I7XHJcbiAgICAgICAgfSkgICAgICAgICAgIFxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIChlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSHRtbCh3aGVyZTpzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0ZXN0OkpRdWVyeSA9ICQoXCIjXCIgKyB3aGVyZSkucGFyZW50KCk7XHJcbiAgICAgICAgdGVzdC5jaGlsZHJlbigpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9jbGFzcy9BcHBcIjtcclxuaW1wb3J0IHsgVmVuZGV1ciB9IGZyb20gXCIuL2NsYXNzL1ZlbmRldXJcIjtcclxuXHJcbnZhciBhcHA6IEFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbiQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAvL1RFU1RcclxufSlcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjZXhpdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgYXBwLnJlc2V0UG9zKCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcC5yZXNldERvbSgpOyBcclxuICAgIH0sIDYwMCk7ICAgIFxyXG59KVxyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5iYWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgd2hlcmU6c3RyaW5nID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICBhcHAuZG93bigpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIGFwcC5yZW1vdmVIdG1sKHdoZXJlKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgICBcclxufSlcclxuXHJcbiQoXCIjc3ViUmVnXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKFwiI3dhcm5pbmcsICNhbGVydE1lc3NhZ2VcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG59KVxyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzdWJDb1wiLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IG5hbWU6c3RyaW5nID0gJChcIiN1c2VybmFtZUNvXCIpLnZhbCgpIGFzIHN0cmluZztcclxuICAgIGxldCBwYXNzd29yZDpzdHJpbmcgPSAkKFwiI3Bhc3NDb1wiKS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICBhcHAuc3RvcFByb3BhQ28obmFtZSwgcGFzc3dvcmQpO1xyXG59KVxyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jYXRDb250XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBhcHAuc3RvcFByb3BhKCQucHJveHkoYXBwLnVwLCBhcHApKTtcclxuXHJcbiAgICBsZXQgZGF0YTpudW1iZXIgPSAkKHRoaXMpLmRhdGEoXCJpZFwiKTtcclxuICAgIGFwcC5zdG9wUHJvcGFQcm9kKGRhdGEpO1xyXG59KVxyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5pdGVtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBhcHAudXAoKTtcclxuICAgIGxldCBpZDpzdHJpbmcgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgIGFwcC5zdG9wUHJvcGFEZXNjKGlkKTtcclxufSlcclxuXHJcbiIsIi8vUGVybWV0IGQnYWZmaWNoZXIgbGVzIGVycm9yIGVuIGNhcyBkZSBmYXV0ZSBkZSBmcmFwcGUgZGFucyBsZSAkKFwiLi4uXCIpO1xyXG5cclxuZnVuY3Rpb24gRG9tKHNlbGVjdG9yOiBzdHJpbmcpIDpKUXVlcnl7XHJcbiAgICBsZXQgZWxlbWVudEpxdWVyeTpKUXVlcnkgPSAkKHNlbGVjdG9yKTtcclxuICAgIGlmKGVsZW1lbnRKcXVlcnkubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTCfDqWxlbGVtZW50IFwiICsgc2VsZWN0b3IgKyBcIm4nZXhpc3RlIHBhcyBkYW5zIHZvdHJlIGh0bWwgIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxlbWVudEpxdWVyeTtcclxufSJdfQ==
