<section id="faq" class="faq" style="padding: 0px !important">
    <div data-aos="fade-up">
        <div class="faq-list" style="padding: 0 !important;">
            <ul>
                @foreach ($tahunData as $tahun)
                    <li data-aos="fade-up" data-aos-delay="100"
                        style="background: #eeb020; padding-left: 0; padding-right: 0;border: 1px solid #eeb020;">
                        <a href="{{ route('monev.all', ['aspek' => $aspek, 'tahun' => $tahun->tahun]) }}"
                            class="collapse" data-bs-target="#item1">
                            <div class="person-bar">
                                <span class="person-name">{{ $tahun->tahun }}</span>
                            </div>

                            <i class="bx bx-chevron-down icon-show"></i>
                            <i class="bx bx-chevron-up icon-close"></i>
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</section>
