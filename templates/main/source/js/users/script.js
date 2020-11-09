//Доступный hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
$(document).ready(function () {
	(function () {
		let bgAttr = document.querySelectorAll(".dropdown-menu__item");
		if (bgAttr) {
			bgAttr.forEach(element => {
				let url = element.getAttribute("data-bg");
				element.style.background = `url('${url}')`;
			});
		}
	})();
	(function () {
		var swiperInit = function () {
			var swiperElements = document.querySelectorAll("[data-swiper]");
			swiperElements.forEach(function ($node) {
				if ($node.classList.contains("swiper-container-horizontal") || $node.classList.contains("swiper-container-vertical")) {
					return false;
				}
				var options = JSON.parse($node.getAttribute("data-options"));
				var length = $node.querySelectorAll(".swiper-slide").length;
				if (!options.pagination) {
					options.pagination = {};
				}
				options.pagination.el = $node.parentNode.querySelector(".js-swiper-pagination");
				options.pagination.clickable = true;
				if (!options.scrollbar) {
					options.scrollbar = {};
				}
				options.scrollbar.el = $node.parentNode.querySelector(".js-swiper-scrollbar");
				options.scrollbar.draggable = true;
				options.navigation = {
					nextEl: $node.parentNode.querySelector(".js-swiper__next"),
					prevEl: $node.parentNode.querySelector(".js-swiper__prev")
				};
				if (!options.slidesPerView) {
					if (length < 2) {
						if (options.navigation.prevEl || options.navigation.nextEl) {
							options.navigation.prevEl.style.display = "none";
							options.navigation.nextEl.style.display = "none";
						}
					}
				} else {
					if (length < parseInt(options.slidesPerView)) {
						if (options.navigation.prevEl || options.navigation.nextEl) {
							options.navigation.prevEl.style.display = "none";
							options.navigation.nextEl.style.display = "none";
						}
					}
				}
				new Swiper($node, options);
			});
		};
		if (document.querySelector("[data-swiper]")) {
			swiperInit();
		}
	})();

	function hamburger(element, menu) {
		var button = document.getElementById(element),
			menu = document.getElementById(menu),
			menuList = document.querySelector(".menu"),
			menuParent = document.querySelector('.header__blocks'),
			menuBottom = document.getElementById("js-header__block_bottom");
		button.onclick = function () {
			// Toggle class "opened". Set also aria-expanded to true or false.
			if (-1 !== button.className.indexOf("opened")) {
				button.parentNode.parentNode.classList.remove("active");
				button.className = button.className.replace(" opened", "");
				button.setAttribute("aria-expanded", "false");
				menuBottom.classList.remove("active");
				menuList.classList.remove("active");
				menuParent.classList.remove("active");
				$("body").removeClass("fixed");
				$("html").removeClass("js-height");
				$(".header__overlay").hide();
			} else {
				button.parentNode.parentNode.classList.add("active");
				button.className += " opened";
				button.setAttribute("aria-expanded", "true");
				menuBottom.classList.add("active");
				menuParent.classList.add("active");
				menuList.classList.add("active");
				$("body").addClass("fixed");
				$("html").addClass("js-height");
			}
		};
	}
	var windowWidth2 = $(window).width();
	// NEW SCRIPT
	if ($(".articles-main__slider").length) { }
	if ($(".product-card .js-diagram__slider").length) {
		var $slides = $(".product-card .js-diagram__slider").find(".swiper-slide");
		var $first = $slides.eq(0);
		$first.clone().appendTo(".product-card .js-diagram__slider .swiper-container").addClass("swiper-transform");
		// if ($(".product-card .diagram .swiper-slide").length > 4) {
		// 	$('.diagram__next').show();
		// 	$('.diagram__prev').show();
		// } else {
		// 	$('.diagram__next').hide();
		// 	$('.diagram__prev').hide();
		// }
	}
	$(".js-product-card__buy,.product-day__buy,.special-offers__buy").click(function () {
		$(document).ajaxSuccess(function () {
			console.log("1111");
			if ($(".basket__item").length > 3) {
				console.log("2222");
				$(".added-cart__items .basket__prev").show();
				$(".added-cart__items .basket__next").show();
				var mySwiper14 = new Swiper(".added-cart__items .swiper-container", {
					slidesPerView: 3,
					slidesPerGroup: 1,
					spaceBetween: 25,
					touchRatio: 1,
					navigation: {
						nextEl: ".added-cart__items .basket__next",
						prevEl: ".added-cart__items .basket__prev"
					},
					breakpoints: {
						550: {
							slidesPerView: 1,
							slidesPerGroup: 1,
							spaceBetween: 16,
						},
						767: {
							slidesPerView: 2,
						},
					}
				});
			}
		});
	});
	$(".js-header__search").click(function () {
		if ($(".search__popup").hasClass("search__popup-open") == false) {
			$(".header .search__popup").addClass("search__popup-open");
			$(".header__search").addClass("header__search-open");
			$(".header__overlay").addClass("header__overlay-open");
			$("html").addClass("fixed");
		} else {
			$(".header .search__popup").removeClass("search__popup-open");
			$(".header__search").removeClass("header__search-open");
			$(".header__overlay").removeClass("header__overlay-open");
			$("html").removeClass("fixed");
		}
	});
	$(".js-search-header__input").on("input", function () {
		if ($(this).val()) {
			$(".js-header__button,.js-header__submit").show();
		} else {
			$(".js-header__button,.js-header__submit").hide();
		}
	});
	$(".js-header__button").click(function () {
		$(".header__input").val("");
		$(this).hide();
		$(".js-header__submit").hide();
	});
	$(document).on("click", "[data-ajax]", function (e) {
		e.stopPropagation();
		e.preventDefault();
		$.get(this.getAttribute("data-url"), function (response) {
			globalPopup.append(response).show();
		});
		// $("html").addClass("fixed");
	});
	$(".js-dropdown-menu__title").click(function (event) {
		let overlay = document.querySelector(".header__overlay");
		if ($(this).parent().hasClass("active") == false) {
			$(".dropdown-menu").removeClass("active");
			$(this).parent().addClass("active");
			$("#js-header__block_bottom").scrollTop(0);
			overlay.classList.add("header__overlay-open");
		} else {
			$(this).parent().removeClass("active");
			overlay.classList.remove("header__overlay-open");
		}
		$(".dropdown-menu.active ul.dropdown-menu__list").on("mouseover", function (event) {
			// $('body').css('overflow','hidden');
			$("body").addClass("fixed");
		});
		$(".dropdown-menu.active ul.dropdown-menu__list").on("mouseout", function (event) {
			// $('body').css('overflow','visible');
			$("body").removeClass("fixed");
		});
	});
	$(".js-menu-footer__title").click(function (event) {
		if ($(this).parent().parent().hasClass("active") == false) {
			$(".menu-footer").removeClass("active");
			$(this).parent().parent().addClass("active");
		} else {
			$(this).parent().parent().removeClass("active");
		}
	});
	$(".js-delete__table").click(function () {
		$(this).parent().remove();
	});
	$(".js-filter__title").click(function (e) {
		if ($(this).parent().hasClass("filter__close") == false) {
			$(this).parent().addClass("filter__close");
		} else {
			$(this).parent().removeClass("filter__close");
		}
	});
	$(".js-item__close").click(function () {
		if ($(".filter__form").hasClass("closed") == false) {
			$(".filter__form").addClass("closed");
		} else {
			$(".filter__form").removeClass("closed");
		}
	});
	$(".js-share").click(function (e) {
		e.preventDefault();
		var buttonClose = document.createElement("div");
		buttonClose.className = ("button-close");
		if ($(".share__items").is(":visible")) {
			$(".share__items").hide();
		} else {
			$(".share__items").append(buttonClose);
			$(".share__items").css("display", "flex");
		}
		// $('.share__items').
	});
	// $(".labels>img").hover(function () {
	// 	var alt = $(this).attr('alt');
	// 	var handel = $(this).position().left;
	// 	// var handel2 = $(this).position().right - 15;
	// 	// console.log(handel)
	// 	// console.log(handel2)
	// 	if ($('.labels .labels__popup').length) {
	// 		if ($('.labels .labels__popup').text() == alt) {
	// 			$(".labels .labels__popup").remove();
	// 		} else {
	// 			$(".labels .labels__popup").remove();
	// 			$(".labels").append('<div class="labels__popup" title="' + alt + '">' + alt + '</div>');
	// 		}
	// 	} else {
	// 		$(".labels").append('<div class="labels__popup" title="' + alt + '">' + alt + '</div>');
	// 	}
	// 	$(".labels__popup").css('left', handel);
	// });
	$(".labels__sale").hover(function () {
		$(this).toggleClass("active");
	});
	$(".labels__item").hover(function () {
		$(this).toggleClass("active");
	});
	(function () {
		let point = document.querySelectorAll(".gallery__point");
		let buttonNext = document.querySelector(".gallery__next");
		let buttonPrev = document.querySelector(".gallery__prev");
		let firstAllParent = document.querySelectorAll(".new-gallery .swiper-slide");
		let gallery = document.querySelector(".new-gallery");
		let num = 0;
		let pagination = document.querySelector(".gallery__pagination");
		if (gallery) {
			firstAllParent.forEach(point => {
				let firstParent = point.querySelectorAll(".gallery__parent");
				firstParent[0].classList.add("active");
			});
			point.forEach((el) => {
				el.addEventListener("mouseover", function (e) {
					e.stopPropagation();
					// e.preventDefault();
					point.forEach((element) => {
						element.parentNode.classList.remove("active");
					});
					this.parentNode.classList.add("active");
				}, true);
				let div = document.createElement("div");
				div.classList.add("swiper-pagination-bullet");
				pagination.append(div);
			});
			let paginationDots = pagination.querySelectorAll(".swiper-pagination-bullet");
			let slideIndex = 1;
			showSlides(slideIndex);
			/* Функция увеличивает индекс на 1, показывает следующй слайд*/
			function plusSlide() {
				showSlides(slideIndex += 1);
			}
			/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
			function minusSlide() {
				showSlides(slideIndex -= 1);
			}
			/* Устанавливает текущий слайд */
			function currentSlide(n) {
				showSlides(slideIndex = n);
			}
			/* Основная функция слайдера */
			function showSlides(n) {
				let i;
				let slides = document.getElementsByClassName("gallery__parent");
				// let paginationDots = ;
				if (n > slides.length) {
					slideIndex = 1;
				}
				if (n < 1) {
					slideIndex = slides.length;
				}
				for (i = 0; i < slides.length; i++) {
					slides[i].classList.remove("active");
				}
				for (i = 0; i < paginationDots.length; i++) {
					paginationDots[i].className = paginationDots[i].className.replace(" swiper-pagination-bullet-active", "");
				}
				slides[slideIndex - 1].classList.add("active");
				paginationDots[slideIndex - 1].className += " swiper-pagination-bullet-active";
			}
			buttonNext.addEventListener("click", plusSlide);
			buttonPrev.addEventListener("click", minusSlide);
			paginationDots.forEach((el, index) => el.addEventListener("click", function () {
				currentSlide(index + 1);
			}));
		}
	})();
	$(".catalog__prop .js-link-pop-glossary").hover(function () {
		var text = $(this).find(".popup-prop__text").text();
		var handel = $(this).position().left;
		const $this = $(this);
		// console.log(text)
		// console.log(handel)
		if ($(this).children(".popup-prop").css("display") == "none") {
			if ($(this).attr("click") == "false") {
				console.log("11");
				$(this).attr("click", "true");
				return false;
			}
			$(".popup-prop").hide();
			$(this).children(".popup-prop").show();
			$(this).find(".popup-prop__link").attr("target", "blank");
			if ($(this).find(".button-close").length < 1) {
				var buttonClose = document.createElement("div");
				buttonClose.className = ("button-close");
				$(this).find(".popup-prop").append(buttonClose);
			}
			if (text.length > 300) {
				text = text.substring(0, 300);
				var lastIndex = text.lastIndexOf(" "); // позиция последнего пробела
				text = text.substring(0, lastIndex) + "...";
				$(this).find(".popup-prop__text").text(text);
				console.log($(this).find(".popup-prop__text").text().length);
			}
		} else {
			$(this).children(".popup-prop").hide();
		}
		// $(document).mouseup(function (e) { // событие клика по веб-документу
		// 	if (!$this.is(e.target) // если клик был не по нашему блоку
		// 		&&
		// 		$this.has(e.target).length === 0) { // и не по его дочерним элементам
		// 		$('.popup-prop').hide() // скрываем его
		// 	}
		// });
	});
	$(".js-characteristic-glossary").click(function () {
		var text = $(this).find(".characteristic-glossary__text").text();
		var $this = $(this);
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(".characteristic-glossary ").removeClass("active");
			$(this).addClass("active");
			$(this).find(".characteristic-glossary__link").attr("target", "blank");
			if ($(this).find(".button-close").length < 1) {
				var buttonClose = document.createElement("div");
				buttonClose.className = ("button-close");
				$(this).find(".popup-gloss").append(buttonClose);
			}
			if (text.length > 300) {
				text = text.substring(0, 300);
				var lastIndex = text.lastIndexOf(" "); // позиция последнего пробела
				text = text.substring(0, lastIndex) + "...";
				$(this).find(".characteristic-glossary__text").text(text);
			}
			// $('body').on("click", function (event) {
			// 	// $('body').css('overflow','hidden');
			// 	$this.removeClass('active');
			// });
			$(document).mouseup(function (e) { // событие клика по веб-документу
				var div = $("#popup"); // тут указываем ID элемента
				if (!$this.is(e.target) // если клик был не по нашему блоку
					&& $this.has(e.target).length === 0) { // и не по его дочерним элементам
					$this.removeClass("active"); // скрываем его
				}
			});
			var target = $this.children(".popup-gloss");
			var targetPos = target.offset().top;
			var windowHeight = $(window).height();
			var elHeight = target.height();
			var scrollToElem = targetPos + elHeight;
			$(window).scroll(function () {
				var winScrollTop = $(this).scrollTop();
				if (winScrollTop > scrollToElem) {
					$(target).parent().removeClass("active");
				}
				if (scrollToElem - windowHeight - elHeight > winScrollTop) {
					$(target).parent().removeClass("active");
				}
			});
		}
	});
	$(".js-characteristic-glossary").hover(function () {
		var text = $(this).find(".characteristic-glossary__text").text();
		var $this = $(this);
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(".characteristic-glossary ").removeClass("active");
			$(this).addClass("active");
			$(this).find(".characteristic-glossary__link").attr("target", "blank");
			if ($(this).find(".button-close").length < 1) {
				var buttonClose = document.createElement("div");
				buttonClose.className = ("button-close");
				$(this).find(".popup-gloss").append(buttonClose);
			}
			if (text.length > 300) {
				text = text.substring(0, 300);
				var lastIndex = text.lastIndexOf(" "); // позиция последнего пробела
				text = text.substring(0, lastIndex) + "...";
				$(this).find(".characteristic-glossary__text").text(text);
			}
			// $('body').on("click", function (event) {
			// 	// $('body').css('overflow','hidden');
			// 	$this.removeClass('active');
			// });
			$(document).mouseup(function (e) { // событие клика по веб-документу
				var div = $("#popup"); // тут указываем ID элемента
				if (!$this.is(e.target) // если клик был не по нашему блоку
					&& $this.has(e.target).length === 0) { // и не по его дочерним элементам
					$this.removeClass("active"); // скрываем его
				}
			});
			var target = $this.children(".popup-gloss");
			var targetPos = target.offset().top;
			var windowHeight = $(window).height();
			var elHeight = target.height();
			var scrollToElem = targetPos + elHeight;
			$(window).scroll(function () {
				var winScrollTop = $(this).scrollTop();
				if (winScrollTop > scrollToElem) {
					$(target).parent().removeClass("active");
				}
				if (scrollToElem - windowHeight - elHeight > winScrollTop) {
					$(target).parent().removeClass("active");
				}
			});
		}
	});
	$(document).on("click", ".js-filter-glossary", function (e) {
		// e.stopPropagation();
		// e.preventDefault();
		var $this = $(this);
		if ($(this).attr("data-glossary") == "show") {
			$(this).attr("data-glossary", "hide");
		} else {
			$(".js-filter-glossary").attr("data-glossary", "hide");
			$(this).attr("data-glossary", "show");
			$(document).mouseup(function (e) { // событие клика по веб-документу
				if (!$this.is(e.target) // если клик был не по нашему блоку
					&& $this.has(e.target).length === 0) { // и не по его дочерним элементам
					$this.attr("data-glossary", "hide"); // скрываем его
				}
			});
			var target = $this;
			var targetPos = target.offset().top;
			var windowHeight = $(window).height();
			var elHeight = target.height();
			var scrollToElem = targetPos + elHeight;
			if ($(this).find(".button-close").length < 1) {
				var buttonClose = document.createElement("div");
				buttonClose.className = ("button-close");
				$(this).find(".popup-gloss").append(buttonClose);
			}
			$(window).scroll(function () {
				var winScrollTop = $(this).scrollTop();
				if (winScrollTop > scrollToElem) {
					$(target).attr("data-glossary", "hide");
				}
				if (scrollToElem - windowHeight - elHeight > winScrollTop) {
					$(target).attr("data-glossary", "hide");
				}
			});
		}
	});
	$(document).on("click", "a[href='#'].js-close", function (e) {
		e.preventDefault();
		console.log("preventClick-1");
	});
	$(document).on("click", "a[href='#'].load-more", function (e) {
		e.preventDefault();
		console.log("preventClick-2");
	});
	$(document).on("click", ".js-city-change", function (e) {
		$(this).toggleClass("active");
	});
	$(document).on("click", ".button-close", function (e) {
		// var shareItems = document.getElementsByClassName('share__items');
		if (this.parentElement.classList.contains("share__items")) {
			console.log("222222222222");
			this.parentElement.style.display = ("none");
		}
		if (this.parentElement.classList.contains("popup-gloss")) {
			console.log("33333");
			this.parentElement.parentElement.setAttribute("click", "false");
			this.parentElement.parentElement.removeClass = "active";
		}
		if (this.parentElement.classList.contains("popup-prop")) {
			console.log("44444");
			this.parentElement.style.display = "none";
		}
		this.remove();
	});
	if (windowWidth2 > 767) {
		if ($("h1.title:contains(\"Корзина\")")) {
			$("h1.title:contains(\"Корзина\")").css("width", "100%");
		}
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();
			// var asideHeightSum = asideHeight + asideOffsetTop - 600;
			if (scroll > 10) {
				$(".dropdown-menu").removeClass("active");
				$(".header__overlay").removeClass("header__overlay-open");
				$(".header .search__popup").removeClass("search__popup-open");
				$(".header__search").removeClass("header__search-open");
				$(".header__overlay").removeClass("header__overlay-open");
			}
		});
		(() => {
			let check = document.querySelector(".catalog .js-recently-watched");
			if (check) {
				$(".col-md-3 .sidebar").css("padding-bottom", "400px");
			}
		})();
	}
	if (windowWidth2 <= 767) {
		$(".logo").appendTo(".header__block_top .container");
		$(".labels").appendTo(".product-card .product__header_top");
		$(".sidebar-right").appendTo(".product-card");
		$(".reviews__main-link").appendTo(".product-card .reviews");
		$(".col-md-3 .js-container-upsale").remove();
		if ($(".favorite__items").length) {
			console.log("юк");
		}
		if ($(".js-favorite_list[data-list=\"Избранное\"]").length) {
			var favorite = $(".js-favorite_list[data-list=\"Избранное\"]");
			favorite.addClass("favorite__items");
			$(".js-favorite_filter").prependTo($(".col-md-9"));
			$(".title").prependTo($(".col-md-9"));
			$(".breadcrumbs").prependTo($(".col-md-9"));
		}
		if ($(".filter-new").length) {
			$(".filter-new ").append("<div class=\"filter-new__button js-filter-new__button\"><span>фильтр</span></div>");
			$(".filter-new").addClass("active");
			$(".js-filter-new__button").click(function () {
				// $(this).parent().toggleClass('active')
				if ($(this).parent().hasClass("active")) {
					$(this).parent().removeClass("active");
					$(".filter-new__button span").text("закрыть");
				} else {
					$(".filter-new__button span").text("фильтр");
					$(this).parent().addClass("active");
				}
			});
		}
		$(function () {
			$(".hide-tabs .js-characteristic__title").click(function (e) {
				$(this).toggleClass("active").nextUntil(".characteristic__title").toggleClass("active");
			});
		});
		if ($("h1.title:contains(\"Статьи и акции\")").length > 0) {
			$(".col-md-3").addClass("order");
		}
		(function () {
			var firstDropdownMenu = document.querySelector("nav.dropdown-menu");
			$(".header__block_top .menu").appendTo("#js-header__block_bottom .container");
			$(".js-city-change").appendTo("#js-header__block_bottom .menu");
			$("#js-menu .header__telephones").appendTo("#js-header__block_bottom .menu");
			firstDropdownMenu.classList.add("active");
		})();
		(function () {
			let catalogList = document.querySelector(".catalog__list");
			if (catalogList) {
				console.log("catalog__list");
				catalogList.parentNode.classList.add("new-catalog");
			}
		})();
		(function () {
			let catalogThumb = document.querySelector(".catalog__thumb");
			if (catalogThumb) {
				console.log("catalog__thumb");
				catalogThumb.parentNode.classList.add("new-catalog");
			}
		})();
		(function () {
			let productCard = document.querySelector(".product-card");
			if (productCard) {
				let favorite = productCard.querySelector(".product-card__social");
				let productHeaderBottom = productCard.querySelector(".product__header_bottom");
				productHeaderBottom.append(favorite);
			}
		})();
		(function () {
			var swiperInit = function () {
				var swiperElements = document.querySelectorAll("[data-swiper-mobile]");
				swiperElements.forEach(function ($node) {
					if ($node.classList.contains("swiper-container-horizontal") || $node.classList.contains("swiper-container-vertical")) {
						return false;
					}
					var options = JSON.parse($node.getAttribute("data-options"));
					var length = $node.querySelectorAll(".swiper-slide").length;
					if (!options.pagination) {
						options.pagination = {};
					}
					options.pagination.el = $node.parentNode.querySelector(".js-swiper-pagination");
					options.pagination.clickable = true;
					options.navigation = {
						nextEl: $node.parentNode.querySelector(".js-swiper__next"),
						prevEl: $node.parentNode.querySelector(".js-swiper__prev")
					};
					if (!options.slidesPerView) {
						if (length < 2) {
							if (options.navigation.prevEl || options.navigation.nextEl) {
								options.navigation.prevEl.style.display = "none";
								options.navigation.nextEl.style.display = "none";
							}
						}
					} else {
						if (length < parseInt(options.slidesPerView)) {
							if (options.navigation.prevEl || options.navigation.nextEl) {
								options.navigation.prevEl.style.display = "none";
								options.navigation.nextEl.style.display = "none";
							}
						}
					}
					new Swiper($node, options);
				});
			};
			if (document.querySelector("[data-swiper-mobile]")) {
				swiperInit();
			}
		})();
	}
	$(".js-comparison__select").click(function () {
		if ($(this).hasClass("active") == true) {
			$(".comparison__select ").removeClass("active");
			$(this).addClass("active");
		} else {
			$(".comparison__select ").removeClass("active");
			$(this).addClass("active");
		}
	});
	$(".js-help__row").click(function () {
		if ($(this).hasClass("help__row-open") == false) {
			$(".help__row").children(".help__info").hide();
			$(".help__row").removeClass("help__row-open");
			$(this).addClass("help__row-open");
			$(this).children(".help__info").show();
		} else {
			$(this).removeClass("help__row-open");
			$(this).children(".help__info").hide();
		}
	});
	$(".js-filter_reset").click(function () {
		document.location.href = "";
		return false;
	});
	window.globalPopup = new Popup();
	(function (footerSelector, wrapperSelector) {
		var footer = document.querySelector(footerSelector);
		var wrapper = document.querySelector(wrapperSelector);
		var height;
		var setSize;
		if (!wrapper || !footer) {
			return false;
		}
		setSize = function () {
			height = footer.offsetHeight;
			wrapper.style.paddingBottom = height + "px";
			footer.style.marginTop = height * -1 + "px";
		};
		setSize();
		window.addEventListener("resize", setSize, false);
	})("#js-footer", "#js-wrapper");
	$(".filter__form .checkbox-number").each(function () {
		if ($(this).text() === "0") {
			$(this).parent().addClass("disabled");
		}
	});
	if ($(".filter-tip").length > 0) {
		$(".filter-tip").parent().addClass("parent-tip");
	}
	$(".filter__slider").draggable();
	hamburger("js-hamburger", "js-menu");
	$(".filter__tags").click(function () {
		$(this).addClass("active");
	});
	$(".header__overlay").click(function () {
		$(".header .search__popup").removeClass("search__popup-open");
		$(".header__search").removeClass("header__search-open");
		$(".header__overlay").removeClass("header__overlay-open");
		$("html").removeClass("fixed");
		$(".dropdown-menu").removeClass("active");
	});
	// $(function () {
	// 	$(".js-datepicker").datepicker();
	// });
	$(function () {
		$.datepicker.regional["ru"] = {
			closeText: "Закрыть",
			prevText: "&#x3c;Пред",
			nextText: "След&#x3e;",
			currentText: "Сегодня",
			monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
			monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
			dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
			dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			dateFormat: "dd.mm.yy",
			firstDay: 1,
			isRTL: false
		};
		$.datepicker.setDefaults($.datepicker.regional["ru"]);
		$(".js-datapicker").datepicker({
			minTime: 1,
			format: "d.m.Y",
			minDate: 1,
			// onSelectDate: function(ct, $i) {
			//   this.setOptions({
			// 	minTime: ct.getTime() > new Date ? false : 0
			//   })
			// }
		});
	});
	(function () {
		var mobileDetect = /Android|iPhone|iPad|iPod|BlackBerry|WPDesktop|IEMobile|Opera Mini/i.test(navigator.userAgent);
		var event = mobileDetect ? "touchend" : "mouseup";

		function Ratings(opts) {
			var opts = this.extend({
				element: "",
				countRate: 5,
				clickFn: function () { }
			}, opts);
			this.element = opts.element;
			if (!this.element) {
				return;
			}
			this.init(opts);
			this.events(opts);
		}
		Ratings.prototype = {
			init: function (opts) {
				var obj = this;
				this.tags = {};
				this.tags.default_state = this.element.querySelector(".ratings__disable");
				this.tags.hover = this.element.querySelector(".ratings__hover");
				this.tags.click = this.element.querySelector(".ratings__click");
				this.widthElement = this.element.offsetWidth / opts.countRate;
				this.width_votes = 0;
				this.votes = 0;
			},
			events: function (opts) {
				var obj = this;
				this.element.addEventListener("mouseover", function () {
					obj.tags.default_state.style.display = "block";
					obj.tags.hover.style.display = "block";
				}, false);
				this.element.addEventListener("mouseout", function () {
					obj.tags.default_state.style.display = "none";
					obj.tags.hover.style.display = "none";
				}, false);
				this.element.addEventListener("mousemove", function (e) {
					obj.width_votes = e.clientX - obj.element.getBoundingClientRect().left;
					obj.votes = Math.ceil(obj.width_votes / obj.widthElement);
					obj.tags.hover.style.width = obj.votes * obj.widthElement + "px";
				}, false);
				this.element.addEventListener(event, function () {
					obj.tags.click.style.width = obj.votes * obj.widthElement + "px";
					opts.clickFn.call(this, obj.votes);
				}, false);
			},
			extend: function (defaults, source) {
				for (var key in source) {
					if (source.hasOwnProperty(key)) {
						defaults[key] = source[key];
					}
				}
				return defaults;
			}
		};
		window.Ratings = Ratings;
	})();
	$(".js-viewForm").click(function () {
		//upon clicking of the button do an ajax post
		$(document).ajaxSuccess(function () {
			new Ratings({
				element: document.querySelector(".js-ratings__section"), // передаем элемент
				countRate: 5, // кол-во оценок
				clickFn: function (index) {
					$(".js-review_rating").val(index);
				}
			});
			$("[title=Телефон],.js-phone_mask").attr("type", "tel");
			$("[title=Телефон],.js-phone_mask").attr("placeholder", "Телефон");
			// $("[title=Телефон],.js-phone_mask,[title=Телефон]").prop("required", true);
			Inputmask.extendAliases({
				"customAlias": {
					mask: "+7 (999) 999-99-99",
					oncomplete: function () {
						$(this).removeClass("BadPols");
					},
					onincomplete: function () {
						$(this).addClass("BadPols");
						$(this).val("");
					},
				}
			});
			Inputmask("customAlias").mask("[type=tel]");
		});
	});
	$(".js-about-store__button").click(function () {
		if ($(this).parent().hasClass("active") == false) {
			$(this).text("Свернуть");
			$(this).parent().addClass("active");
		} else {
			$(this).parent().removeClass("active");
			$(this).text("Читать подробнее");
		}
	});
	$(function () {
		if ($("#compare_table").length > 0) {
			$(function () {
				compareArray.init({
					table: document.getElementById("compare_table"),
					button: document.getElementById("compare_table_button").getElementsByTagName("a"),
					indexCols: 0,
					indexRows: 1,
					zebra: true,
					zebraClass: "gray_row",
					callback: function () { }
				});
				var butt = $("#compare_table_button"),
					ul = $(butt).next();
				butt.click(function (e) {
					e.stopPropagation();
					if ($(this).hasClass("down")) {
						$(ul).slideUp(200);
						$(this).removeClass("down");
					} else {
						$(ul).slideDown(200);
						$(this).addClass("down");
					}
					return false;
				});
				$(document).click(function () {
					$(butt).removeClass("down");
					$(ul).slideUp(200);
				});
			});
			console.log("compare_table");
			$(".js-comparison-height").parent().parent().addClass("thead__comparison");
			$(".js-comparison__link").click(function (e) {
				e.preventDefault();
			});
			$(".js-compare_block-change.active").parent().addClass("order");
			window.onload = function () {
				// $('.comparison__main .characteristic__row').each(function (index, el) {
				// 	var height = $('.swiper-container-comparison .characteristic__row').eq(index).height();
				// 	$(el).height(height);
				// });
				if (windowWidth2 > 767) {
					console.log($(".products-line").outerHeight(true));
					$(".thead__comparison").css({
						"height": ($(".products-line").outerHeight() + "px")
					});
					console.log("1");
				} else {
					console.log("2");
					$(".thead__comparison").css({
						"margin-bottom": ($(".products-line").innerHeight() + "px")
					});
					$(".js-swiper-comparison").css({
						"margin-top": ($(".thead__comparison").height() - 10 + "px")
					});
					$(".comparison .js-swiper-pagination").css({
						"top": ($(".thead__comparison").height() + 29 + "px")
					});
					$(".comparison .js-swiper-prev").css({
						"top": ($(".thead__comparison").height() + 48 + "px")
					});
					$(".comparison .js-swiper-next").css({
						"top": ($(".thead__comparison").height() + 48 + "px")
					});
					$(".comparison__main .characteristic__row").each(function (index, el) {
						if ($(this).text().length > 60) {
							$(this).addClass("level");
							$(".js-swiper-comparison .characteristic__row").eq(index).addClass("level");
							console.log($(this).text());
						}
					});
				}
			}();
			var comparison_height = $(".thead__comparison").height();
			console.log(comparison_height);
			var if_max_width = false;
			$(window).scroll(function () {
				var scroll = $(window).scrollTop();
				if (scroll > comparison_height && !if_max_width) {
					if_max_width = true;
					$(".comparison").addClass("fixed");
				} else if (scroll < comparison_height && if_max_width) {
					if_max_width = false;
					$(".comparison").removeClass("fixed");
				}
			});
			$(".comparison .fixed-header").css({
				"width": ($(".comparison").width())
			});
			var mySwiper7 = new Swiper(".comparison__diagram .diagram__slider", {
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 27,
				touchRatio: 1,
				allowTouchMove: false,
				navigation: {
					nextEl: ".special-offers_next",
					prevEl: ".special-offers_prev"
				},
				breakpoints: {
					767: {
						allowTouchMove: true,
						slidesPerView: 2,
						touchRatio: 1,
						spaceBetween: 16,
						slidesPerGroup: 1,
						// pagination: {
						// 	type: "fraction",
						// },
					},
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				thumbs: {
					swiper: mySwiper8,
					swiper: mySwiper5
				}
			});
			var mySwiper8 = new Swiper(".fixed-header .swiper-container", {
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 27,
				touchRatio: 1,
				allowTouchMove: false,
				navigation: {
					nextEl: ".special-offers_next",
					prevEl: ".special-offers_prev"
				},
				breakpoints: {
					767: {
						allowTouchMove: true,
						slidesPerView: 2,
						slidesPerGroup: 1,
						spaceBetween: 16,
					},
					// 600: {
					// 	slidesPerView: 2,
					// },
					// 768: {
					// 	slidesPerView: 2,
					// 	slidesPerGroup: 1,
					// 	spaceBetween: 24
					// },
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				thumbs: {
					swiper: mySwiper7,
					swiper: mySwiper5
				}
			});
			var mySwiper5 = new Swiper(".js-swiper-comparison", {
				slidesPerView: 3,
				slidesPerGroup: 1,
				spaceBetween: 27,
				allowTouchMove: false,
				// loop: true,
				// loopFillGroupWithBlank: true,
				navigation: {
					nextEl: ".special-offers_next",
					prevEl: ".special-offers_prev"
				},
				// scrollbar: {
				// 	el: ".swiper-scrollbar",
				// 	hide: false,
				// 	draggable: true
				// },
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				breakpoints: {
					767: {
						allowTouchMove: true,
						slidesPerView: 2,
						touchRatio: 1,
						spaceBetween: 16,
						slidesPerGroup: 1,
						pagination: {
							type: "fraction",
						},
					},
					// 	600: {
					// 		slidesPerView: 1,
					// 	},
					// 	768: {
					// 		slidesPerView: 2,
					// 		slidesPerGroup: 1,
					// 	},
				},
				thumbs: {
					swiper: mySwiper7,
					swiper: mySwiper8
				}
			});
			let comparisonItem = document.querySelectorAll(".comparison__item");
			let comparisonList = document.querySelector(".comparison__list");
			if (comparisonItem.length > 1) {
				comparisonList.classList.add("triangle");
			}
		}
		if ($(".diagram").length) {
			var value = 0;
			var array = [];
			$(".diagram__items").each(function (index, el) {
				var arr = [];
				$(this).find(".diagram__pic").each(function (index, element) {
					arr.push($(element).data("param1"));
					array.push($(element).data("param1"));
				});
				var maxVal = Math.max.apply(null, arr);
				$(".diagram__maxvalue").text(maxVal);
				value = maxVal;
			});
			var zeroCheck = array.reduce(function (prev, next) {
				return prev + next;
			});
			if (zeroCheck == 0) {
				$(".diagram__items .swiper-slide").each(function (index, el) {
					var data1 = $(this).find(".diagram__pic").data("param1");
					$(this).find(".diagram__text").text(data1 + "  руб");
					$(this).find(".schedule").css({
						"height": ($(this).find(".diagram__pic").data("param1") / 100 + "%")
					});
				});
			} else {
				$(".diagram__items .swiper-slide").each(function (index, el) {
					var data1 = $(this).find(".diagram__pic").data("param1");
					$(this).find(".diagram__text").text(data1 + "  руб");
					$(this).find(".schedule").css({
						"height": ($(this).find(".diagram__pic").data("param1") / value * 100 + "%")
					});
				});
			}
			console.log(value);
			$(".js-diagram__param2").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param2"));
						array.push($(element).data("param2"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param2");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param2") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param2");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param2") / value * 100 + "%")
						});
					});
				}
			});
			$(".js-diagram__param1").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param1"));
						array.push($(element).data("param1"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param1");
						$(this).find(".diagram__text").text(data1 + "  руб");
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param1") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param1");
						$(this).find(".diagram__text").text(data1 + "  руб");
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param1") / value * 100 + "%")
						});
					});
				}
			});
			$(".js-diagram__param3").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param3"));
						array.push($(element).data("param3"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param3");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param3") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param3");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param3") / value * 100 + "%")
						});
					});
				}
			});
			$(".js-diagram__param4").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param4"));
						array.push($(element).data("param4"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param4");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param4") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param4");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param4") / value * 100 + "%")
						});
					});
				}
			});
			$(".js-diagram__param5").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param5"));
						array.push($(element).data("param5"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param5");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param5") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param5");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param5") / value * 100 + "%")
						});
					});
				}
			});
			$(".js-diagram__param6").click(function () {
				var array = [];
				$(".diagram__tabs").removeClass("active");
				$(this).addClass("active");
				$(".diagram__items").each(function (index, el) {
					var arr = [];
					$(this).find(".diagram__pic").each(function (index, element) {
						arr.push($(element).data("param6"));
						array.push($(element).data("param6"));
					});
					var maxVal = Math.max.apply(null, arr);
					$(".diagram__maxvalue").text(maxVal);
					value = maxVal;
				});
				var zeroCheck = array.reduce(function (prev, next) {
					return prev + next;
				});
				if (zeroCheck == 0) {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param6");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param6") / 100 + "%")
						});
					});
				} else {
					$(".diagram__items .swiper-slide").each(function (index, el) {
						var data1 = $(this).find(".diagram__pic").data("param6");
						$(this).find(".diagram__text").text(data1);
						$(this).find(".schedule").css({
							"height": ($(this).find(".diagram__pic").data("param6") / value * 100 + "%")
						});
					});
				}
			});
			if (windowWidth2 < 768) {
				$(".diagram__sidebar").click(function () {
					$(this).toggleClass("active");
				});
				$(".comparison__list").click(function () {
					$(this).toggleClass("active");
				});
				// mySwiper7.controller.control = mySwiper8;
				// // mySwiper8.controller.control = mySwiper7;
				// mySwiper7.controller.control = mySwiper5;
			}
		}
	});
	$(function () {
		$(".js-glossary__title,.js-glossary__items").click(function () {
			$(this).parent().toggleClass("closed").removeClass("only-link").find(".js-glossary__li").removeClass("active");
			$(this).parent().find(".js-glossary__item").removeClass("test");
		});
		$(".js-glossary .js-glossary__li").click(function () {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				if ($(this).parent().parent().hasClass("only-link")) {
					$(".js-glossary").addClass("closed").removeClass("only-link");
				}
			} else {
				$(this).addClass("active");
			}
		});
		$(".js-glossary.only-link .js-glossary__li.active").click(function () {
			e.stopPropagation();
			e.preventDefault();
			$(".js-glossary").addClass("closed").removeClass("only-link");
		});
		$(".js-glossary a").click(function (e) {
			e.preventDefault();
		});
		var arrElem = document.querySelectorAll(".js-glossary__item");
		var arrLink = document.querySelectorAll(".js-glossary__li");
		var arrayElem = [];
		for (var i = 0; i < arrElem.length; i++) {
			arrayElem.push(arrElem[i]);
			arrElem[i].addEventListener("click", function (e) {
				e.preventDefault();
				e.stopPropagation();
				$(".js-glossary__li.active").removeClass("active");
				$(".js-glossary").addClass("closed");
				var test = arrayElem.indexOf(e.target);
				$(".js-glossary__item").removeClass("test");
				$(arrayElem[test]).addClass("test").parent().parent().removeClass("closed").addClass("only-link");
				var activeEl = $(arrLink[test]).addClass("active");
				$("html, body").animate({
					scrollTop: $(activeEl).offset().top
				}, 1000);
			});
		}
	});
	$(function () {
		$("[data-fancybox=\"gallery\"]").fancybox({});
		$("[data-scroll]").click(function () {
			event.preventDefault();
			var id = $(this).attr("href"),
				top = $(id).offset().top;
			$("body,html").animate({
				scrollTop: top
			}, 1500);
			return false;
		});
	});
	if ($("[type=tel],[title=Телефон],.js-phone_mask").length) {
		setTimeout(function () {
			console.log("inputmask");
			$("[title=Телефон],.js-phone_mask").attr("type", "tel");
			// $("[title=Телефон],.js-phone_mask,[title=Телефон]").prop("required", true);
			$("[title=Телефон],.js-phone_mask,[title=Телефон]").val("");
			Inputmask.extendAliases({
				"customAlias": {
					mask: "+7 (999) 999-99-99",
					oncomplete: function () {
						$(this).removeClass("BadPols");
					},
					onincomplete: function () {
						$(this).addClass("BadPols");
						$(this).val("");
					},
				}
			});
			Inputmask("customAlias").mask("[type=tel]");
		}, 300);
	}
	// if ($("[type=tel],[title=Телефон],.js-phone_mask").length) {
	// 	console.log("inputmask");
	// 	$("[title=Телефон],.js-phone_mask").attr("type", "tel");
	// 	// $("[title=Телефон],.js-phone_mask,[title=Телефон]").prop("required", true);
	// 	Inputmask.extendAliases({
	// 		"customAlias": {
	// 			mask: "+7 (999) 999-99-99",
	// 			oncomplete: function () {
	// 				$(this).removeClass("BadPols");
	// 			},
	// 			onincomplete: function () {
	// 				$(this).addClass("BadPols");
	// 				$(this).val("");
	// 			},
	// 		}
	// 	});
	// 	Inputmask("customAlias").mask("[type=tel]");
	// }
	if ($(".page__title.content-top__title.content-top__title_top span").length > 0) {
		$(".content-top").addClass("content-top__tags");
	}

	function loadingAjax() {
		$.ajax({
			beforeSend: function () {
				$("body").addClass("loading-ajax");
			},
			success: function (msg) {
				$("body").removeClass("loading-ajax");
			}
		});
	}
	$("#load-items").click(loadingAjax);
});
$(window).on("load", function () {
	var windowWidth2 = $(window).width();
	setTimeout(function () {
		// var mySwiper = new Swiper(".js-swiper-main", {
		// 	// Optional parameters
		// 	direction: "horizontal",
		// 	loop: true,
		// 	autoplay: {
		// 		delay: 4000,
		// 		disableOnInteraction: false,
		// 	},
		// 	// If we need pagination
		// 	pagination: {
		// 		el: ".swiper-pagination",
		// 		clickable: true
		// 	},
		// 	// Navigation arrows
		// 	navigation: {
		// 		nextEl: ".main_next",
		// 		prevEl: ".main_prev"
		// 	},
		// 	// And if we need scrollbar
		// 	scrollbar: {
		// 		el: ".swiper-scrollbar",
		// 		draggable: true
		// 	}
		// });
		var galleryThumbs = new Swiper(".js-gallery-thumbs", {
			spaceBetween: 9,
			slidesPerView: 6,
			freeMode: true,
			// direction: "vertical",
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			touchRatio: 0.2,
			slideToClickedSlide: true,
			breakpoints: {
				// when window width is <= 320px
				// 420: {
				//   slidesPerGroup: 1,
				//   slidesPerView: 1,
				//   spaceBetween: 0
				// },
				// // // when window width is <= 480px
				// // 480: {
				// 700: {
				//   slidesPerView: 2,
				//   slidesPerGroup: 2,
				//   spaceBetween: 20
				// },
				768: {
					spaceBetween: 14
				}
			},
			navigation: {
				nextEl: ".thumbs-next",
				prevEl: ".thumbs-prev"
			},
		});
		var galleryTop = new Swiper(".js-gallery-top", {
			spaceBetween: 0,
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },
			pagination: {
				el: ".gallery-top__pagination",
				clickable: true
			},
			thumbs: {
				swiper: galleryThumbs
			}
		});
	}, 100);
	if ($(".filter-new").length) {
		$(".filter-new .bx-filter-parameters-box-container").each(function () {
			if ($(this).find(".checkbox").length >= 4) {
				$(this).addClass("more");
				$(this).find(".checkbox").eq(3).addClass("js-autoHeight");
				$(this).find(".js-autoHeight").hide();
				$(this).find(".js-autoHeight").nextAll(".checkbox").hide();
				// $('.js-autoHeight').each(function () {
				// 	var elHeight = $(this).offset().top
				// 	var elHeightParent = $(this).parent().offset().top
				// 	var summ = elHeight - elHeightParent;
				// 	$(this).closest('.bx-filter-parameters-box-container').css('height', summ + 27);
				// })
			}
		});
		$("<span class=\"more-text js-more-text\">Показать еще</span>").prependTo($(".more .col-xs-12"));
		$(".js-more-text").click(function () {
			if ($(this).parent().parent().hasClass("more")) {
				$(this).parent().parent().removeClass("more");
				$(this).text("Свернуть");
				$(this).siblings(".js-autoHeight").show();
				$(this).siblings(".js-autoHeight").nextAll(".checkbox").show();
			} else {
				$(this).parent().parent().addClass("more");
				$(this).text("Показать еще");
				$(this).siblings(".js-autoHeight").hide();
				$(this).siblings(".js-autoHeight").nextAll(".checkbox").hide();
				// $(this).siblings('.js-autoHeight').each(function () {
				// 	var elHeight = $(this).offset().top
				// 	var elHeightParent = $(this).parent().offset().top
				// 	var summ = elHeight - elHeightParent;
				// 	$(this).closest('.bx-filter-parameters-box-container').css('height', summ + 27);
				// })
			}
		});
	}
	if ($(".filter__form.js-form").length) {
		$(".filter__form.js-form .filter__checkbox").each(function () {
			if ($(this).find("label").length > 4) {
				$(this).addClass("more");
				$(this).find("label").eq(2).addClass("js-autoHeight");
				$(".js-autoHeight").each(function () {
					var elHeight = $(this).offset().top;
					var elHeightParent = $(this).parent().offset().top;
					var summ = elHeight - elHeightParent;
					$(this).closest(".filter__checkbox").css("height", summ + 27);
				});
			}
		});
		$("<span class=\"more-text js-more-text\">Показать еще</span>").prependTo($(".more"));
		$(".js-more-text").click(function () {
			if ($(this).parent().hasClass("more")) {
				$(this).parent().removeClass("more");
				$(this).parent().css("height", "auto");
				$(this).text("Свернуть");
			} else {
				$(this).parent().addClass("more");
				$(this).text("Показать еще");
				$(this).siblings(".js-autoHeight").each(function () {
					var elHeight = $(this).offset().top;
					var elHeightParent = $(this).parent().offset().top;
					var summ = elHeight - elHeightParent;
					$(this).closest(".filter__checkbox").css("height", summ + 27);
				});
			}
		});
	}
	if ($(".comparison").length) {
		$(".js-compare_block-change.active").parent().addClass("order");
		if ($(".comparison__link")) {
			$(".comparison__list").each(function () {
				let category = $(this).find(".comparison__link");
				if (category.hasClass("active")) {
					$(this).parent().addClass("order");
				} else {
					$(".comparison__list .comparison__item:eq(0)").addClass("order");
				}
			});
			// if (select.hasClass('active')) {
			// 	console.log('1')
			// }
			$(".comparison__list").height($(".comparison__item.order").innerHeight());
		}
		if (windowWidth2 > 767) {
			console.log($(".products-line").outerHeight(true));
			$(".thead__comparison").css({
				"height": ($(".products-line").outerHeight() + "px")
			});
			console.log("1");
		} else {
			console.log("2");
			$(".thead__comparison").css({
				"margin-bottom": ($(".products-line").innerHeight() + "px")
			});
			$(".js-swiper-comparison").css({
				"margin-top": ($(".thead__comparison").height() - 10 + "px")
			});
			$(".comparison .js-swiper-pagination").css({
				"top": ($(".thead__comparison").height() + 29 + "px")
			});
			$(".comparison .js-swiper-prev").css({
				"top": ($(".thead__comparison").height() + 48 + "px")
			});
			$(".comparison .js-swiper-next").css({
				"top": ($(".thead__comparison").height() + 48 + "px")
			});
			$(".comparison__main .characteristic__row").each(function (index, el) {
				if ($(this).text().length > 60) {
					$(this).addClass("level");
					$(".js-swiper-comparison .characteristic__row").eq(index).addClass("level");
					console.log($(this).text());
				}
			});
		}
		$(".comparison__main .characteristic__row").each(function (index, el) {
			if ($(this).text().length > 60) {
				$(this).addClass("level");
				$(".js-swiper-comparison .characteristic__row").eq(index).addClass("level");
				console.log($(this).text());
			}
			if ($(this).text().length > 110) {
				$(this).addClass("level-2");
				$(".js-swiper-comparison .characteristic__row").eq(index).addClass("level-2");
				console.log($(this).text());
			}
		});
		$(".comparison__main .characteristic__row").each(function (index, el) {
			if (windowWidth2 >= 768) {
				var height = $(".js-swiper-comparison .characteristic__row").eq(index).outerHeight();
				$(el).outerHeight(height);
			} else {
				setTimeout(function () {
					var height = $(".js-swiper-comparison .characteristic__row").eq(index).outerHeight();
					$(el).outerHeight(height);
				}, 500);
				setTimeout(function () {
					var height = $(".js-swiper-comparison .characteristic__row").eq(index).outerHeight();
					$(el).outerHeight(height);
				}, 2000);
				setTimeout(function () {
					var height = $(".js-swiper-comparison .characteristic__row").eq(index).outerHeight();
					$(el).outerHeight(height);
				}, 4000);
			}
		});
	}
	if ($("a[data-fancybox=\"gallery\"] img").length) {
		// $('a[data-fancybox="gallery"] img').eq(0).each(function () {
		// 	var img = new Image($(this));
		// 	img.src = $(this).attr('src');
		// 	if (img.height > 0) {
		// 		$(this).height(img.height)
		// 	}
		// });
		// setInterval(function () {
		// 	$('a[data-fancybox="gallery"] img').each(function () {
		// 		var img = new Image($(this));
		// 		img.src = $(this).attr('src');
		// 		if (img.height > 0) {
		// 			$(this).height(img.height)
		// 		}
		// 	});
		// }, 100);
		// setInterval(function () {
		// 	$('a[data-fancybox="gallery"] img').eq(0).each(function () {
		// 		var img = new Image($(this));
		// 		img.src = $(this).attr('src');
		// 		if (img.height > 0) {
		// 			$(this).height(img.height)
		// 		}
		// 	});
		// }, 300);
	}
	if (windowWidth2 > 767) { } else {
		(function () {
			let moreText = document.querySelector(".product-card .description");
			if (moreText) {
				console.log("есть");
				let button = document.createElement("div");
				let openText = "Читать подробнее",
					closeText = "Свернуть";
				moreText.append(button);
				button.classList.add("js-switch", "switch");
				button.innerHTML = openText;
				button.onclick = function () {
					this.parentElement.classList.toggle("active");
					button.innerHTML == "Читать подробнее" ? button.innerHTML = closeText : button.innerHTML = openText;
				};
			}
		})();
	}
	if ($(".MultiFile-intercepted").length) {
		// Убрать прикрепленный файл после отправки рекламации
		$(document).ajaxSuccess(function () {
			let returnExchangeForm = document.querySelector(".return-exchange__form");
			returnExchangeForm.querySelectorAll(".MultiFile-remove").forEach(element => element.click());
		});
	}
	(function () {
		let height = document.querySelector(".instructions__items");
		if (height) {
			height.style.height = height.clientHeight + "px";
		}
	})();

	$("body").append(function (index) {
		return $("<a href=\"#wrapper\" class=\"go_to_top go_to\">");
	});
	var btn = $(".go_to_top");
	$(window).scroll(function () {
		if ($(window).scrollTop() > 500) {
			btn.addClass("visible_goto");
		} else {
			btn.removeClass("visible_goto");
		}
	});
	btn.on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "300");
	});
});
